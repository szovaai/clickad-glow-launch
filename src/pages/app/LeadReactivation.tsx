import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw, Plus, Trash2, UserX, Send, Clock, Users } from "lucide-react";
import ClientSelector from "@/components/app/shared/ClientSelector";

const LeadReactivation = () => {
  const { agencyId } = useAuth();
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState("");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [log, setLog] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  // New campaign form
  const [form, setForm] = useState({
    name: "Cold Lead Reactivation",
    inactive_days_min: 30,
    inactive_days_max: 90,
    channel: "sms",
    sms_template: "Hi {{name}}, it's been a while since we last connected! We have some availability coming up — interested in getting your project started? Reply YES to chat.",
    email_subject: "We missed you!",
    email_template: "Hi {{name}},\n\nIt's been a while since your inquiry about {{service}}. We'd love to help you get started.\n\nReply to this email or give us a call.\n\nBest regards",
  });

  useEffect(() => {
    if (selectedClient) {
      loadCampaigns();
      loadLog();
    }
  }, [selectedClient]);

  const loadCampaigns = async () => {
    const { data } = await supabase
      .from("reactivation_campaigns")
      .select("*")
      .eq("client_account_id", selectedClient)
      .order("created_at", { ascending: false });
    setCampaigns(data || []);
  };

  const loadLog = async () => {
    const { data } = await supabase
      .from("reactivation_log")
      .select("*")
      .eq("client_account_id", selectedClient)
      .order("sent_at", { ascending: false })
      .limit(50);
    setLog(data || []);
  };

  const createCampaign = async () => {
    setSaving(true);
    const { error } = await supabase.from("reactivation_campaigns").insert({
      client_account_id: selectedClient,
      ...form,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Campaign created!" });
      setShowCreate(false);
      loadCampaigns();
    }
  };

  const toggleCampaign = async (c: any) => {
    await supabase.from("reactivation_campaigns").update({ active: !c.active }).eq("id", c.id);
    loadCampaigns();
  };

  const deleteCampaign = async (id: string) => {
    await supabase.from("reactivation_campaigns").delete().eq("id", id);
    loadCampaigns();
    toast({ title: "Deleted" });
  };

  const runNow = async () => {
    setRunning(true);
    try {
      const resp = await supabase.functions.invoke("lead-reactivation");
      const processed = resp.data?.processed || 0;
      toast({ title: `Processed ${processed} leads` });
      loadCampaigns();
      loadLog();
    } catch {
      toast({ title: "Error running reactivation", variant: "destructive" });
    }
    setRunning(false);
  };

  if (!selectedClient) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Lead Reactivation</h1>
        <ClientSelector value={selectedClient} onChange={setSelectedClient} />
        <p className="text-muted-foreground">Select a client to manage reactivation campaigns.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserX className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Lead Reactivation</h1>
        </div>
        <ClientSelector value={selectedClient} onChange={setSelectedClient} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {campaigns.reduce((s, c) => s + (c.total_contacted || 0), 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Contacted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {campaigns.reduce((s, c) => s + (c.total_replied || 0), 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Replied</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold text-foreground">{campaigns.filter(c => c.active).length}</p>
              <p className="text-xs text-muted-foreground">Active Campaigns</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Campaign
        </Button>
        <Button variant="glow" onClick={runNow} disabled={running}>
          <RefreshCcw className={`h-4 w-4 mr-1 ${running ? "animate-spin" : ""}`} />
          {running ? "Running..." : "Run Now"}
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="border-primary/30 glow-border">
          <CardHeader>
            <CardTitle className="text-foreground">New Reactivation Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Campaign Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Channel</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                >
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Inactive Min (days)</Label>
                <Input type="number" value={form.inactive_days_min} onChange={(e) => setForm({ ...form, inactive_days_min: Number(e.target.value) })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Inactive Max (days)</Label>
                <Input type="number" value={form.inactive_days_max} onChange={(e) => setForm({ ...form, inactive_days_max: Number(e.target.value) })} />
              </div>
            </div>

            {(form.channel === "sms" || form.channel === "both") && (
              <div className="space-y-1">
                <Label className="text-xs">SMS Template</Label>
                <Textarea
                  value={form.sms_template}
                  onChange={(e) => setForm({ ...form, sms_template: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">Use {"{{name}}"} and {"{{service}}"} placeholders</p>
              </div>
            )}

            {(form.channel === "email" || form.channel === "both") && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs">Email Subject</Label>
                  <Input value={form.email_subject} onChange={(e) => setForm({ ...form, email_subject: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Email Template</Label>
                  <Textarea
                    value={form.email_template}
                    onChange={(e) => setForm({ ...form, email_template: e.target.value })}
                    rows={4}
                  />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button variant="glow" onClick={createCampaign} disabled={saving}>
                {saving ? "Creating..." : "Create Campaign"}
              </Button>
              <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign list */}
      <div className="space-y-3">
        {campaigns.map((c) => (
          <Card key={c.id} className="border-border/50 glass">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Switch checked={c.active} onCheckedChange={() => toggleCampaign(c)} />
                <div>
                  <h3 className="font-medium text-foreground">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {c.inactive_days_min}-{c.inactive_days_max} days • {c.channel} • {c.total_contacted} contacted
                    {c.last_run_at && ` • Last run: ${new Date(c.last_run_at).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={c.active ? "default" : "secondary"}>
                  {c.active ? "Active" : "Paused"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => deleteCampaign(c.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {!campaigns.length && (
          <p className="text-muted-foreground text-sm text-center py-8">
            No reactivation campaigns yet. Create one to start re-engaging cold leads.
          </p>
        )}
      </div>

      {/* Recent activity log */}
      {log.length > 0 && (
        <Card className="border-border/50 glass">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Recent Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {log.slice(0, 10).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between text-sm bg-muted/20 rounded-lg p-3">
                  <div>
                    <span className="font-medium text-foreground">{entry.contact_name || entry.contact_phone || entry.contact_email}</span>
                    <span className="text-muted-foreground ml-2">• {entry.source_type}</span>
                    {entry.original_inquiry && (
                      <span className="text-muted-foreground ml-1">— {entry.original_inquiry}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={entry.replied ? "default" : "secondary"} className="text-xs">
                      {entry.replied ? "Replied" : entry.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.sent_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeadReactivation;
