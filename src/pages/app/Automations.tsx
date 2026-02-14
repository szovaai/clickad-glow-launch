import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Workflow, PhoneMissed, Plus, Copy, Pencil, Trash2 } from "lucide-react";
import MissedCallDashboard from "@/components/app/calls/MissedCallDashboard";
import SequenceBuilder from "@/components/app/automations/SequenceBuilder";
import { sequenceTemplates } from "@/components/app/automations/SequenceTemplates";

const Automations = () => {
  const { agencyId } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [sequences, setSequences] = useState<any[]>([]);
  const [editingSeq, setEditingSeq] = useState<any | null>(null);
  const [newSeqName, setNewSeqName] = useState("");
  const [newSeqTrigger, setNewSeqTrigger] = useState("new_lead");
  const [showBuilder, setShowBuilder] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!agencyId) return;
    supabase.from("client_accounts").select("id, business_name").eq("agency_id", agencyId)
      .then(({ data }) => {
        setClients(data || []);
        if (data?.length) setSelectedClient(data[0].id);
      });
  }, [agencyId]);

  useEffect(() => {
    if (!selectedClient) return;
    loadSequences();
  }, [selectedClient]);

  const loadSequences = async () => {
    const { data } = await supabase.from("follow_up_sequences")
      .select("*").eq("client_account_id", selectedClient).order("created_at", { ascending: false });
    setSequences(data || []);
  };

  const createFromTemplate = async (template: typeof sequenceTemplates[0]) => {
    setSaving(true);
    const { error } = await supabase.from("follow_up_sequences").insert({
      client_account_id: selectedClient,
      name: template.name,
      trigger_event: template.triggerEvent,
      steps: template.steps,
    });
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Created!", description: `${template.name} sequence added.` }); loadSequences(); }
  };

  const saveSequence = async (steps: any[]) => {
    setSaving(true);
    if (editingSeq) {
      await supabase.from("follow_up_sequences").update({ steps }).eq("id", editingSeq.id);
      setEditingSeq(null);
    } else {
      await supabase.from("follow_up_sequences").insert({
        client_account_id: selectedClient,
        name: newSeqName || "Custom Sequence",
        trigger_event: newSeqTrigger,
        steps,
      });
    }
    setSaving(false);
    setShowBuilder(false);
    setNewSeqName("");
    loadSequences();
    toast({ title: "Saved!" });
  };

  const toggleActive = async (seq: any) => {
    await supabase.from("follow_up_sequences").update({ active: !seq.active }).eq("id", seq.id);
    loadSequences();
  };

  const deleteSequence = async (id: string) => {
    await supabase.from("follow_up_sequences").delete().eq("id", id);
    loadSequences();
    toast({ title: "Deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Automations</h1>
        <select
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          {clients.map((c) => <option key={c.id} value={c.id}>{c.business_name}</option>)}
        </select>
      </div>

      <Tabs defaultValue="calls">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="calls" className="data-[state=active]:bg-primary/20">
            <PhoneMissed className="h-4 w-4 mr-1" /> Missed Calls
          </TabsTrigger>
          <TabsTrigger value="sequences" className="data-[state=active]:bg-primary/20">
            <Workflow className="h-4 w-4 mr-1" /> Follow-Up Sequences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calls" className="mt-4">
          {selectedClient ? <MissedCallDashboard clientAccountId={selectedClient} /> : (
            <p className="text-muted-foreground">Select a client to view call data.</p>
          )}
        </TabsContent>

        <TabsContent value="sequences" className="mt-4 space-y-6">
          {/* Existing Sequences */}
          <div className="space-y-3">
            {sequences.map((seq) => (
              <Card key={seq.id} className="border-border/50 glass">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Switch checked={seq.active} onCheckedChange={() => toggleActive(seq)} />
                    <div>
                      <h3 className="font-medium text-foreground">{seq.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Trigger: {seq.trigger_event} • {(seq.steps as any[])?.length || 0} steps
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={seq.active ? "default" : "secondary"}>{seq.active ? "Active" : "Paused"}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => { setEditingSeq(seq); setShowBuilder(true); }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteSequence(seq.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Builder */}
          {showBuilder && (
            <Card className="border-primary/30 glow-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">
                  {editingSeq ? `Edit: ${editingSeq.name}` : "New Sequence"}
                </CardTitle>
                {!editingSeq && (
                  <div className="flex gap-3 mt-2">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Name</Label>
                      <Input value={newSeqName} onChange={(e) => setNewSeqName(e.target.value)} placeholder="My Sequence" className="h-8" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Trigger</Label>
                      <select className="h-8 rounded border border-input bg-background px-2 text-xs" value={newSeqTrigger} onChange={(e) => setNewSeqTrigger(e.target.value)}>
                        <option value="new_lead">New Lead</option>
                        <option value="missed_call">Missed Call</option>
                        <option value="no_show">No-Show</option>
                        <option value="quote_sent">Quote Sent</option>
                        <option value="reactivation">Reactivation</option>
                      </select>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <SequenceBuilder
                  initialSteps={editingSeq ? editingSeq.steps : undefined}
                  onSave={saveSequence}
                  saving={saving}
                />
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setEditingSeq(null); setShowBuilder(true); }}>
              <Plus className="h-4 w-4 mr-1" /> Create Custom
            </Button>
          </div>

          {/* Templates */}
          <Card className="border-border/50 glass">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Copy className="h-5 w-5 text-primary" /> Pre-Built Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {sequenceTemplates.map((t, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.steps.length} steps • {t.triggerEvent}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => createFromTemplate(t)} disabled={saving}>
                    Use Template
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Automations;
