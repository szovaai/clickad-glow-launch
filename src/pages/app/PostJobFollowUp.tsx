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
import { HeartHandshake, RefreshCcw, Save, Send, Star, Wrench } from "lucide-react";
import ClientSelector from "@/components/app/shared/ClientSelector";

const PostJobFollowUp = () => {
  const { toast } = useToast();
  const [clientId, setClientId] = useState(() => localStorage.getItem("selectedClientId") || "");
  const [config, setConfig] = useState<any>(null);
  const [log, setLog] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    active: true,
    delay_hours: 2,
    satisfaction_sms: "Hi {{name}}, thanks for choosing {{business}}! How was your experience? Reply 1-5 (5 = amazing).",
    upsell_sms: "Glad you had a great experience, {{name}}! Did you know we also offer maintenance plans? Reply INFO to learn more.",
    upsell_enabled: true,
    review_redirect_enabled: true,
    review_threshold: 4,
  });

  useEffect(() => {
    if (clientId) {
      localStorage.setItem("selectedClientId", clientId);
      loadConfig();
      loadLog();
    }
  }, [clientId]);

  const loadConfig = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("post_job_configs")
      .select("*")
      .eq("client_account_id", clientId)
      .single();
    if (data) {
      setConfig(data);
      setForm({
        active: data.active,
        delay_hours: data.delay_hours,
        satisfaction_sms: data.satisfaction_sms,
        upsell_sms: data.upsell_sms,
        upsell_enabled: data.upsell_enabled,
        review_redirect_enabled: data.review_redirect_enabled,
        review_threshold: data.review_threshold,
      });
    }
    setLoading(false);
  };

  const loadLog = async () => {
    const { data } = await supabase
      .from("post_job_log")
      .select("*")
      .eq("client_account_id", clientId)
      .order("sent_at", { ascending: false })
      .limit(20);
    setLog(data || []);
  };

  const saveConfig = async () => {
    setSaving(true);
    if (config) {
      await supabase.from("post_job_configs").update(form).eq("id", config.id);
    } else {
      await supabase.from("post_job_configs").insert({ client_account_id: clientId, ...form });
    }
    setSaving(false);
    toast({ title: "Settings saved!" });
    loadConfig();
  };

  const runNow = async () => {
    setRunning(true);
    try {
      const resp = await supabase.functions.invoke("post-job-followup");
      toast({ title: `Processed ${resp.data?.processed || 0} appointments` });
      loadLog();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
    setRunning(false);
  };

  if (!clientId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Post-Job Follow-Up</h1>
        <ClientSelector value={clientId} onChange={setClientId} />
        <p className="text-muted-foreground">Select a client to configure follow-ups.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HeartHandshake className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Post-Job Follow-Up</h1>
        </div>
        <ClientSelector value={clientId} onChange={setClientId} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{log.length}</p>
              <p className="text-xs text-muted-foreground">Follow-Ups Sent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{log.filter(l => l.review_sent).length}</p>
              <p className="text-xs text-muted-foreground">Reviews Triggered</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 glass">
          <CardContent className="p-4 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold text-foreground">{log.filter(l => l.upsell_sent).length}</p>
              <p className="text-xs text-muted-foreground">Upsells Sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="glow" onClick={runNow} disabled={running}>
          <RefreshCcw className={`h-4 w-4 mr-1 ${running ? "animate-spin" : ""}`} />
          {running ? "Running..." : "Run Now"}
        </Button>
      </div>

      {/* Config */}
      <Card className="border-primary/30 glow-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span>Follow-Up Settings</span>
            <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Delay After Job (hours)</Label>
              <Input
                type="number"
                value={form.delay_hours}
                onChange={(e) => setForm({ ...form, delay_hours: Number(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">How long to wait after the appointment ends</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Review Rating Threshold</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.review_threshold}
                onChange={(e) => setForm({ ...form, review_threshold: Number(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">Ratings ≥ this go to Google Reviews</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Satisfaction Check SMS</Label>
            <Textarea
              value={form.satisfaction_sms}
              onChange={(e) => setForm({ ...form, satisfaction_sms: e.target.value })}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Use {"{{name}}"} and {"{{business}}"} placeholders</p>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.upsell_enabled} onCheckedChange={(v) => setForm({ ...form, upsell_enabled: v })} />
            <Label className="text-sm">Enable Maintenance Upsell</Label>
          </div>

          {form.upsell_enabled && (
            <div className="space-y-1">
              <Label className="text-xs">Upsell SMS</Label>
              <Textarea
                value={form.upsell_sms}
                onChange={(e) => setForm({ ...form, upsell_sms: e.target.value })}
                rows={3}
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <Switch checked={form.review_redirect_enabled} onCheckedChange={(v) => setForm({ ...form, review_redirect_enabled: v })} />
            <Label className="text-sm">Auto-Send Review Request</Label>
          </div>

          <Button variant="glow" onClick={saveConfig} disabled={saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent log */}
      {log.length > 0 && (
        <Card className="border-border/50 glass">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Recent Follow-Ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {log.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between text-sm bg-muted/20 rounded-lg p-3">
                  <div>
                    <span className="font-medium text-foreground">{entry.customer_name || entry.customer_phone}</span>
                    <span className="text-muted-foreground ml-2">• {entry.step}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.review_sent && <Badge variant="default" className="text-xs">Review Sent</Badge>}
                    {entry.upsell_sent && <Badge variant="secondary" className="text-xs">Upsold</Badge>}
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

export default PostJobFollowUp;
