import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plug, Phone, Calendar, Zap, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ClientSelector from "@/components/app/shared/ClientSelector";

const maskSecret = (val: string) => val ? "••••••••" + val.slice(-4) : "";

export default function Integrations() {
  const { agencyId } = useAuth();
  const [clientId, setClientId] = useState("");

  // GHL state
  const [ghl, setGhl] = useState({ api_key: "", location_id: "", pipeline_id: "", stage_mapping: {} as any, loaded: false, hasKey: false });
  // Twilio state
  const [twilio, setTwilio] = useState({ account_sid: "", auth_token: "", phone_number: "", missed_call_enabled: false, missed_call_message: "", loaded: false, hasSid: false });
  // Calendar state
  const [cal, setCal] = useState({ calendar_id: "", duration: 30, buffer: 15, loaded: false });
  const [saving, setSaving] = useState("");

  useEffect(() => {
    if (!clientId) return;

    // Load GHL
    supabase.from("ghl_integrations").select("*").eq("client_account_id", clientId).maybeSingle().then(({ data }) => {
      if (data) {
        setGhl({ api_key: "", location_id: data.location_id || "", pipeline_id: data.pipeline_id || "", stage_mapping: data.stage_mapping || {}, loaded: true, hasKey: !!data.api_key });
      } else {
        setGhl({ api_key: "", location_id: "", pipeline_id: "", stage_mapping: {}, loaded: true, hasKey: false });
      }
    });

    // Load phone config (Twilio)
    supabase.from("client_configs").select("phone_config").eq("client_account_id", clientId).maybeSingle().then(({ data }) => {
      const pc = (data?.phone_config as any) || {};
      setTwilio({
        account_sid: "", auth_token: "", phone_number: pc.phone_number || "", missed_call_enabled: pc.missed_call_enabled || false, missed_call_message: pc.missed_call_message || "Sorry we missed your call! How can we help?", loaded: true, hasSid: !!pc.account_sid,
      });
    });

    // Load calendar
    supabase.from("client_configs").select("calendar_settings").eq("client_account_id", clientId).maybeSingle().then(({ data }) => {
      const cs = (data?.calendar_settings as any) || {};
      setCal({ calendar_id: cs.calendar_id || "", duration: cs.duration || 30, buffer: cs.buffer || 15, loaded: true });
    });
  }, [clientId]);

  const saveGHL = async () => {
    setSaving("ghl");
    const payload: any = { client_account_id: clientId, location_id: ghl.location_id, pipeline_id: ghl.pipeline_id, stage_mapping: ghl.stage_mapping };
    if (ghl.api_key) payload.api_key = ghl.api_key;
    const { error } = await supabase.from("ghl_integrations").upsert(payload, { onConflict: "client_account_id" });
    setSaving("");
    if (error) toast.error(error.message);
    else { toast.success("GoHighLevel saved"); setGhl((g) => ({ ...g, hasKey: g.hasKey || !!g.api_key, api_key: "" })); }
  };

  const saveTwilio = async () => {
    setSaving("twilio");
    const payload: any = { phone_number: twilio.phone_number, missed_call_enabled: twilio.missed_call_enabled, missed_call_message: twilio.missed_call_message };
    if (twilio.account_sid) payload.account_sid = twilio.account_sid;
    if (twilio.auth_token) payload.auth_token = twilio.auth_token;
    const { error } = await supabase.from("client_configs").update({ phone_config: payload as any }).eq("client_account_id", clientId);
    setSaving("");
    if (error) toast.error(error.message);
    else { toast.success("Twilio config saved"); setTwilio((t) => ({ ...t, hasSid: t.hasSid || !!t.account_sid, account_sid: "", auth_token: "" })); }
  };

  const saveCalendar = async () => {
    setSaving("cal");
    const { error } = await supabase.from("client_configs").update({ calendar_settings: { calendar_id: cal.calendar_id, duration: cal.duration, buffer: cal.buffer } as any }).eq("client_account_id", clientId);
    setSaving("");
    if (error) toast.error(error.message);
    else toast.success("Calendar settings saved");
  };

  const testAI = async () => {
    setSaving("ai");
    try {
      const { data, error } = await supabase.functions.invoke("chat-qualifier", {
        body: { clientAccountId: clientId, message: "Hello, this is a test.", visitorId: "test-" + Date.now() },
      });
      if (error) throw error;
      toast.success("AI responded: " + ((data as any)?.reply || "OK").slice(0, 80));
    } catch (e: any) {
      toast.error("AI test failed: " + e.message);
    }
    setSaving("");
  };

  if (!clientId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2"><Plug className="w-6 h-6 text-primary" /> Integrations</h1>
        <ClientSelector value={clientId} onChange={setClientId} />
        <Card className="border-border/50"><CardContent className="p-8 text-center text-muted-foreground">Select a client to manage integrations.</CardContent></Card>
      </div>
    );
  }

  const StatusBadge = ({ connected }: { connected: boolean }) => (
    <Badge variant={connected ? "default" : "secondary"} className="gap-1">
      {connected ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {connected ? "Connected" : "Not Connected"}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2"><Plug className="w-6 h-6 text-primary" /> Integrations</h1>
        <ClientSelector value={clientId} onChange={setClientId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GHL */}
        <Card className="border-border/50 glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> GoHighLevel</CardTitle>
            <StatusBadge connected={ghl.hasKey} />
          </CardHeader>
          <CardContent className="space-y-3">
            <div><Label>API Key</Label><Input type="password" placeholder={ghl.hasKey ? "••••••••(saved)" : "Enter API key"} value={ghl.api_key} onChange={(e) => setGhl((g) => ({ ...g, api_key: e.target.value }))} /></div>
            <div><Label>Location ID</Label><Input value={ghl.location_id} onChange={(e) => setGhl((g) => ({ ...g, location_id: e.target.value }))} /></div>
            <div><Label>Pipeline ID</Label><Input value={ghl.pipeline_id} onChange={(e) => setGhl((g) => ({ ...g, pipeline_id: e.target.value }))} /></div>
            <Button onClick={saveGHL} disabled={saving === "ghl"} className="w-full">{saving === "ghl" ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}Save</Button>
          </CardContent>
        </Card>

        {/* Twilio */}
        <Card className="border-border/50 glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Twilio</CardTitle>
            <StatusBadge connected={twilio.hasSid} />
          </CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Account SID</Label><Input type="password" placeholder={twilio.hasSid ? "••••••••(saved)" : "Enter SID"} value={twilio.account_sid} onChange={(e) => setTwilio((t) => ({ ...t, account_sid: e.target.value }))} /></div>
            <div><Label>Auth Token</Label><Input type="password" placeholder="Enter token" value={twilio.auth_token} onChange={(e) => setTwilio((t) => ({ ...t, auth_token: e.target.value }))} /></div>
            <div><Label>Phone Number</Label><Input value={twilio.phone_number} onChange={(e) => setTwilio((t) => ({ ...t, phone_number: e.target.value }))} placeholder="+1234567890" /></div>
            <div className="flex items-center justify-between"><Label>Missed Call Text-Back</Label><Switch checked={twilio.missed_call_enabled} onCheckedChange={(v) => setTwilio((t) => ({ ...t, missed_call_enabled: v }))} /></div>
            <Button onClick={saveTwilio} disabled={saving === "twilio"} className="w-full">{saving === "twilio" ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}Save</Button>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="border-border/50 glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Google Calendar</CardTitle>
            <StatusBadge connected={!!cal.calendar_id} />
          </CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Calendar ID</Label><Input value={cal.calendar_id} onChange={(e) => setCal((c) => ({ ...c, calendar_id: e.target.value }))} placeholder="email@gmail.com" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Duration (min)</Label><Input type="number" value={cal.duration} onChange={(e) => setCal((c) => ({ ...c, duration: +e.target.value }))} /></div>
              <div><Label>Buffer (min)</Label><Input type="number" value={cal.buffer} onChange={(e) => setCal((c) => ({ ...c, buffer: +e.target.value }))} /></div>
            </div>
            <Button onClick={saveCalendar} disabled={saving === "cal"} className="w-full">{saving === "cal" ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}Save</Button>
          </CardContent>
        </Card>

        {/* AI / Gemini */}
        <Card className="border-primary/20 glow-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> AI (Lovable AI)</CardTitle>
            <Badge className="gap-1"><CheckCircle2 className="w-3 h-3" /> Pre-Connected</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">AI is powered by Lovable AI Gateway — no API key required. Uses Google Gemini models for chat qualification and voice agent.</p>
            <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 space-y-1">
              <div>Model: <span className="text-foreground">google/gemini-3-flash-preview</span></div>
              <div>Status: <span className="text-primary">Active</span></div>
            </div>
            <Button variant="outline" onClick={testAI} disabled={saving === "ai"} className="w-full">
              {saving === "ai" ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}Test AI Response
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
