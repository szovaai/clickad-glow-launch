import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Phone, FileText, Zap, Clock, AlertTriangle, BookOpen } from "lucide-react";
import { toast } from "sonner";
import ScriptBuilder from "@/components/app/voice/ScriptBuilder";
import CallFlowBuilder from "@/components/app/voice/CallFlowBuilder";
import KnowledgePreview from "@/components/app/shared/KnowledgePreview";

interface VoiceConfig {
  id?: string;
  greeting_script: string;
  qualification_script: string;
  booking_script: string;
  transfer_rules: {
    emergencyTransfer: boolean;
    emergencyNumber: string;
    afterHoursVoicemail: boolean;
    maxQualificationAttempts: number;
  };
  active: boolean;
}

const defaultConfig: VoiceConfig = {
  greeting_script: "",
  qualification_script: "",
  booking_script: "",
  transfer_rules: {
    emergencyTransfer: false,
    emergencyNumber: "",
    afterHoursVoicemail: true,
    maxQualificationAttempts: 3,
  },
  active: false,
};

export default function VoiceModule() {
  const { agencyId } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [config, setConfig] = useState<VoiceConfig>(defaultConfig);
  const [transcripts, setTranscripts] = useState<any[]>([]);
  const [functionDefs, setFunctionDefs] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load clients
  useEffect(() => {
    if (!agencyId) return;
    supabase
      .from("client_accounts")
      .select("id, business_name")
      .eq("agency_id", agencyId)
      .then(({ data }) => {
        if (data?.length) {
          setClients(data);
          setSelectedClient(data[0].id);
        }
        setLoading(false);
      });
  }, [agencyId]);

  // Load voice config + transcripts + function defs when client changes
  useEffect(() => {
    if (!selectedClient) return;

    const loadData = async () => {
      const [configRes, transcriptRes, funcRes] = await Promise.all([
        supabase.from("voice_configs").select("*").eq("client_account_id", selectedClient).maybeSingle(),
        supabase.from("call_transcripts").select("*").eq("client_account_id", selectedClient).order("created_at", { ascending: false }).limit(20),
        supabase.from("voice_function_defs").select("*").order("name"),
      ]);

      if (configRes.data) {
        setConfig({
          id: configRes.data.id,
          greeting_script: configRes.data.greeting_script || "",
          qualification_script: configRes.data.qualification_script || "",
          booking_script: configRes.data.booking_script || "",
          transfer_rules: (configRes.data.transfer_rules as any) || defaultConfig.transfer_rules,
          active: configRes.data.active,
        });
      } else {
        setConfig(defaultConfig);
      }

      setTranscripts(transcriptRes.data || []);
      setFunctionDefs(funcRes.data || []);
    };

    loadData();
  }, [selectedClient]);

  const saveConfig = async () => {
    if (!selectedClient) return;
    setSaving(true);

    const payload = {
      client_account_id: selectedClient,
      greeting_script: config.greeting_script,
      qualification_script: config.qualification_script,
      booking_script: config.booking_script,
      transfer_rules: config.transfer_rules as any,
      active: config.active,
    };

    let error;
    if (config.id) {
      ({ error } = await supabase.from("voice_configs").update(payload).eq("id", config.id));
    } else {
      const res = await supabase.from("voice_configs").insert(payload).select().single();
      error = res.error;
      if (res.data) setConfig((c) => ({ ...c, id: res.data.id }));
    }

    setSaving(false);
    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Voice configuration saved");
    }
  };

  const outcomeColor = (outcome: string) => {
    switch (outcome) {
      case "booked": return "bg-green-500/20 text-green-400";
      case "qualified": return "bg-blue-500/20 text-blue-400";
      case "transferred": return "bg-orange-500/20 text-orange-400";
      case "voicemail": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Mic className="w-6 h-6 text-primary" />
            Voice AI (Beta)
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI Receptionist powered by Gemini 3 — configure scripts, call flow, and review transcripts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm text-muted-foreground">Enable AI Receptionist</Label>
          <Switch
            checked={config.active}
            onCheckedChange={(v) => setConfig((c) => ({ ...c, active: v }))}
          />
          <Badge variant={config.active ? "default" : "secondary"}>
            {config.active ? "Active" : "Disabled"}
          </Badge>
        </div>
      </div>

      {/* Client selector */}
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

      {!config.active && (
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-300">
              Voice AI is currently disabled. Enable it above and save to start receiving AI-handled calls. 
              The Gemini 3 voice integration will be connected when available.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedClient && (
        <div className="max-w-sm">
          <KnowledgePreview clientId={selectedClient} />
        </div>
      )}

      <Tabs defaultValue="scripts" className="space-y-4">
        <TabsList className="bg-card/50">
          <TabsTrigger value="scripts"><FileText className="w-4 h-4 mr-1" /> Scripts</TabsTrigger>
          <TabsTrigger value="flow"><Zap className="w-4 h-4 mr-1" /> Call Flow</TabsTrigger>
          <TabsTrigger value="transcripts"><Phone className="w-4 h-4 mr-1" /> Transcripts</TabsTrigger>
          <TabsTrigger value="functions"><Zap className="w-4 h-4 mr-1" /> Functions</TabsTrigger>
        </TabsList>

        <TabsContent value="scripts">
          <ScriptBuilder
            scripts={{
              greeting: config.greeting_script,
              qualification: config.qualification_script,
              booking: config.booking_script,
            }}
            onChange={(s) => setConfig((c) => ({
              ...c,
              greeting_script: s.greeting,
              qualification_script: s.qualification,
              booking_script: s.booking,
            }))}
            onSave={saveConfig}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="flow">
          <CallFlowBuilder
            transferRules={config.transfer_rules}
            onChange={(rules) => setConfig((c) => ({ ...c, transfer_rules: rules }))}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={saveConfig} disabled={saving} size="sm">
              {saving ? "Saving…" : "Save Flow Config"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="transcripts">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Recent Call Transcripts</h3>
            {transcripts.length === 0 ? (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <Phone className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No transcripts yet. Transcripts will appear here once voice AI handles calls.</p>
                </CardContent>
              </Card>
            ) : (
              transcripts.map((t) => (
                <Card key={t.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{t.caller_phone}</span>
                        <Badge className={outcomeColor(t.outcome)}>{t.outcome}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {t.duration_seconds}s
                        <span>•</span>
                        {new Date(t.created_at).toLocaleString()}
                      </div>
                    </div>
                    {t.summary && <p className="text-sm text-muted-foreground mb-1">{t.summary}</p>}
                    {t.intent_detected && (
                      <Badge variant="outline" className="text-xs">Intent: {t.intent_detected}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="functions">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Function Definitions</h3>
              <p className="text-sm text-muted-foreground">Functions the Voice AI can call during live conversations</p>
            </div>
            {functionDefs.map((fn) => (
              <Card key={fn.id} className="bg-card/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <code className="text-sm font-mono font-semibold text-foreground">{fn.name}()</code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{fn.description}</p>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">View Parameters</summary>
                    <pre className="mt-1 p-2 bg-background/50 rounded text-xs overflow-x-auto">
                      {JSON.stringify(fn.parameters, null, 2)}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
