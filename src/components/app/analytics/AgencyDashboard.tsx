import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, AlertTriangle, Eye } from "lucide-react";

interface ClientSummary {
  id: string;
  business_name: string;
  status: string;
  totalCalls: number;
  missedCalls: number;
  bookings: number;
  conversations: number;
}

export default function AgencyDashboard() {
  const { agencyId } = useAuth();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agencyId) return;

    const load = async () => {
      const { data: accounts } = await supabase
        .from("client_accounts")
        .select("id, business_name, status")
        .eq("agency_id", agencyId);

      if (!accounts?.length) {
        setLoading(false);
        return;
      }

      const ids = accounts.map((a) => a.id);

      const [callsRes, convoRes] = await Promise.all([
        supabase.from("call_logs").select("client_account_id, status").in("client_account_id", ids),
        supabase.from("chat_conversations").select("client_account_id, status").in("client_account_id", ids),
      ]);

      const summaries: ClientSummary[] = accounts.map((a) => {
        const calls = callsRes.data?.filter((c) => c.client_account_id === a.id) || [];
        const convos = convoRes.data?.filter((c) => c.client_account_id === a.id) || [];
        return {
          id: a.id,
          business_name: a.business_name,
          status: a.status,
          totalCalls: calls.length,
          missedCalls: calls.filter((c) => c.status === "missed").length,
          bookings: convos.filter((c) => c.status === "qualified").length,
          conversations: convos.length,
        };
      });

      summaries.sort((a, b) => b.totalCalls - a.totalCalls);
      setClients(summaries);
      setLoading(false);
    };

    load();
  }, [agencyId]);

  const totalCalls = clients.reduce((s, c) => s + c.totalCalls, 0);
  const totalMissed = clients.reduce((s, c) => s + c.missedCalls, 0);
  const totalBookings = clients.reduce((s, c) => s + c.bookings, 0);
  const totalConvos = clients.reduce((s, c) => s + c.conversations, 0);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading agency overview…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Agency Overview
        </h3>
        <p className="text-sm text-muted-foreground">Aggregate metrics across all clients</p>
      </div>

      {/* Aggregate KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Calls</p>
            <p className="text-2xl font-bold text-foreground">{totalCalls}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Missed</p>
            <p className="text-2xl font-bold text-foreground">{totalMissed}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Chat Conversations</p>
            <p className="text-2xl font-bold text-foreground">{totalConvos}</p>
          </CardContent>
        </Card>
      </div>

      {/* Client list */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No clients yet</p>
          ) : (
            <div className="space-y-2">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{client.business_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.totalCalls} calls · {client.conversations} chats · {client.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {client.missedCalls > 5 && (
                      <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {client.missedCalls} missed
                      </Badge>
                    )}
                    <Badge variant={client.status === "active" ? "default" : "secondary"} className="text-xs">
                      {client.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
