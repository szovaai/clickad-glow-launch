import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneMissed, MessageSquare, Calendar } from "lucide-react";

interface MissedCallDashboardProps {
  clientAccountId: string;
}

const MissedCallDashboard = ({ clientAccountId }: MissedCallDashboardProps) => {
  const [calls, setCalls] = useState<any[]>([]);
  const [smsMessages, setSmsMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientAccountId) return;
    Promise.all([
      supabase.from("call_logs").select("*").eq("client_account_id", clientAccountId).order("created_at", { ascending: false }).limit(50),
      supabase.from("sms_messages").select("*").eq("client_account_id", clientAccountId).order("created_at", { ascending: false }).limit(50),
    ]).then(([callsRes, smsRes]) => {
      setCalls(callsRes.data || []);
      setSmsMessages(smsRes.data || []);
      setLoading(false);
    });
  }, [clientAccountId]);

  const missedCount = calls.filter((c) => c.status === "missed").length;
  const recoveredCount = calls.filter((c) => c.status === "recovered").length;
  const textsSent = smsMessages.filter((s) => s.status === "sent").length;

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-border/50 glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Calls</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{calls.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <PhoneMissed className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Missed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{missedCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Texts Sent</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{textsSent}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Recovered</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{recoveredCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calls */}
      <Card className="border-border/50 glass">
        <CardHeader>
          <CardTitle className="text-sm text-foreground">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading...</p> :
           calls.length === 0 ? <p className="text-muted-foreground text-sm">No calls recorded yet. Webhook endpoint ready.</p> : (
            <div className="space-y-2">
              {calls.slice(0, 10).map((call) => (
                <div key={call.id} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{call.caller_phone}</p>
                    <p className="text-xs text-muted-foreground">{new Date(call.created_at).toLocaleString()}</p>
                  </div>
                  <Badge variant={call.status === "answered" ? "default" : call.status === "recovered" ? "secondary" : "destructive"}>
                    {call.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MissedCallDashboard;
