import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Building2 } from "lucide-react";
import KPICards, { type KPIData } from "@/components/app/analytics/KPICards";
import Charts, { type DailyData } from "@/components/app/analytics/Charts";
import RevenueEstimator from "@/components/app/analytics/RevenueEstimator";
import WeeklySummary from "@/components/app/analytics/WeeklySummary";
import AgencyDashboard from "@/components/app/analytics/AgencyDashboard";
import { format, subDays, startOfDay } from "date-fns";

const emptyKPI: KPIData = {
  totalCalls: 0, answeredCalls: 0, missedCalls: 0, bookedAppointments: 0,
  qualifiedLeads: 0, conversionRate: 0, avgResponseTime: 0, recoveredCalls: 0,
};

export default function Analytics() {
  const { agencyId, isAgencyUser } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [callLogs, setCallLogs] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load clients
  useEffect(() => {
    if (!agencyId) return;
    supabase.from("client_accounts").select("id, business_name").eq("agency_id", agencyId)
      .then(({ data }) => {
        if (data?.length) {
          setClients(data);
          setSelectedClient(data[0].id);
        }
        setLoading(false);
      });
  }, [agencyId]);

  // Load data when client changes
  useEffect(() => {
    if (!selectedClient) return;
    setLoading(true);
    const since = subDays(new Date(), 30).toISOString();

    Promise.all([
      supabase.from("call_logs").select("*").eq("client_account_id", selectedClient).gte("created_at", since).order("created_at"),
      supabase.from("chat_conversations").select("*").eq("client_account_id", selectedClient).gte("created_at", since).order("created_at"),
    ]).then(([callsRes, convosRes]) => {
      setCallLogs(callsRes.data || []);
      setConversations(convosRes.data || []);
      setLoading(false);
    });
  }, [selectedClient]);

  // Compute KPIs
  const kpiData = useMemo<KPIData>(() => {
    const totalCalls = callLogs.length;
    const answeredCalls = callLogs.filter((c) => c.status === "answered").length;
    const missedCalls = callLogs.filter((c) => c.status === "missed").length;
    const recoveredCalls = callLogs.filter((c) => c.status === "recovered").length;
    const qualifiedLeads = conversations.filter((c) => c.status === "qualified").length;
    const bookedAppointments = qualifiedLeads; // approximation
    const conversionRate = totalCalls > 0 ? (bookedAppointments / totalCalls) * 100 : 0;
    const avgResponseTime = 28; // placeholder

    return { totalCalls, answeredCalls, missedCalls, bookedAppointments, qualifiedLeads, conversionRate, avgResponseTime, recoveredCalls };
  }, [callLogs, conversations]);

  // Compute daily data for charts
  const dailyData = useMemo<DailyData[]>(() => {
    const days: Record<string, DailyData> = {};
    for (let i = 13; i >= 0; i--) {
      const d = format(subDays(new Date(), i), "MM/dd");
      days[d] = { date: d, calls: 0, bookings: 0, missed: 0, recovered: 0 };
    }
    callLogs.forEach((c) => {
      const d = format(new Date(c.created_at), "MM/dd");
      if (days[d]) {
        days[d].calls++;
        if (c.status === "missed") days[d].missed++;
        if (c.status === "recovered") days[d].recovered++;
      }
    });
    conversations.forEach((c) => {
      const d = format(new Date(c.created_at), "MM/dd");
      if (days[d] && c.status === "qualified") days[d].bookings++;
    });
    return Object.values(days);
  }, [callLogs, conversations]);

  const pipelineData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    conversations.forEach((c) => {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [conversations]);

  // Previous period (simple: use zeros as baseline since we don't have historical comparison yet)
  const previousKPI = emptyKPI;

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Performance metrics, trends, and revenue insights</p>
        </div>

        {clients.length > 1 && (
          <select
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.business_name}</option>
            ))}
          </select>
        )}
      </div>

      <Tabs defaultValue="client" className="space-y-6">
        <TabsList className="bg-card/50">
          <TabsTrigger value="client"><BarChart3 className="w-4 h-4 mr-1" /> Client Dashboard</TabsTrigger>
          {isAgencyUser && (
            <TabsTrigger value="agency"><Building2 className="w-4 h-4 mr-1" /> Agency Overview</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="client" className="space-y-6">
          <KPICards data={kpiData} loading={loading} />
          <Charts dailyData={dailyData} pipelineData={pipelineData} loading={loading} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueEstimator
              totalCalls={kpiData.totalCalls}
              bookedAppointments={kpiData.bookedAppointments}
              qualifiedLeads={kpiData.qualifiedLeads}
            />
            <WeeklySummary current={kpiData} previous={previousKPI} />
          </div>
        </TabsContent>

        {isAgencyUser && (
          <TabsContent value="agency">
            <AgencyDashboard />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
