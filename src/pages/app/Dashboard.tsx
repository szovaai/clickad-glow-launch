import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare, Calendar, TrendingUp, Users, Zap } from "lucide-react";

const Dashboard = () => {
  const { profile, isAgencyUser, roles, agencyId } = useAuth();
  const [stats, setStats] = useState({ calls: 0, chats: 0, enrollments: 0 });
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    if (!agencyId) return;
    const load = async () => {
      const { data: clients } = await supabase.from("client_accounts").select("id, business_name").eq("agency_id", agencyId);
      if (!clients?.length) return;
      setClientName(clients[0].business_name);
      const ids = clients.map((c) => c.id);

      const [callRes, chatRes, enrollRes] = await Promise.all([
        supabase.from("call_logs").select("id", { count: "exact", head: true }).in("client_account_id", ids),
        supabase.from("chat_conversations").select("id", { count: "exact", head: true }).in("client_account_id", ids),
        supabase.from("sequence_enrollments").select("id", { count: "exact", head: true }).in("client_account_id", ids),
      ]);
      setStats({ calls: callRes.count || 0, chats: chatRes.count || 0, enrollments: enrollRes.count || 0 });
    };
    load();
  }, [agencyId]);

  const convRate = stats.chats > 0 ? Math.round((stats.enrollments / stats.chats) * 100) : 0;

  const statCards = [
    { title: "Total Calls", value: stats.calls.toString(), icon: Phone, desc: "All logged calls" },
    { title: "AI Conversations", value: stats.chats.toString(), icon: MessageSquare, desc: "Chat qualifier sessions" },
    { title: "Enrollments", value: stats.enrollments.toString(), icon: Calendar, desc: "Sequence enrollments" },
    { title: "Conversion Rate", value: convRate + "%", icon: TrendingUp, desc: "Chats → enrollments" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAgencyUser ? "Agency Dashboard" : "Client Dashboard"} • Role: {roles.join(", ") || "No role assigned"}
          {clientName && ` • ${clientName}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-border/50 glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAgencyUser && (
        <Card className="border-border/50 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" /> Client Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Client management is available in the Clients module. Use the sidebar to navigate.</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20 glow-border">
        <CardContent className="flex items-center gap-4 p-6">
          <Zap className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">System Status</h3>
            <p className="text-sm text-muted-foreground">MVP Complete — Auth, Knowledge Base, Integrations, AI Chat, Voice, Automations, and Analytics are all live.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
