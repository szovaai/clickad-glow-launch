import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Copy, Settings, Users, Clock } from "lucide-react";
import ChatQualifierWidget from "@/components/app/chat/ChatQualifierWidget";
import KnowledgePreview from "@/components/app/shared/KnowledgePreview";

const ChatModule = () => {
  const { agencyId } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [widgetConfig, setWidgetConfig] = useState({
    primaryColor: "#3B82F6",
    logoUrl: "",
    autoOpen: false,
    greetingMessage: "Hi! How can I help you today?",
  });
  const [conversations, setConversations] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch clients
  useEffect(() => {
    if (!agencyId) return;
    supabase.from("client_accounts").select("id, business_name").eq("agency_id", agencyId)
      .then(({ data }) => {
        setClients(data || []);
        if (data?.length) setSelectedClient(data[0].id);
      });
  }, [agencyId]);

  // Fetch widget config + conversations when client changes
  useEffect(() => {
    if (!selectedClient) return;
    supabase.from("chat_widget_configs").select("*").eq("client_account_id", selectedClient).single()
      .then(({ data }) => {
        if (data) setWidgetConfig({
          primaryColor: data.primary_color || "#3B82F6",
          logoUrl: data.logo_url || "",
          autoOpen: data.auto_open || false,
          greetingMessage: data.greeting_message || "Hi! How can I help you today?",
        });
      });
    supabase.from("chat_conversations").select("*").eq("client_account_id", selectedClient)
      .order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setConversations(data || []));
  }, [selectedClient]);

  const saveConfig = async () => {
    if (!selectedClient) return;
    setSaving(true);
    const { error } = await supabase.from("chat_widget_configs").upsert({
      client_account_id: selectedClient,
      primary_color: widgetConfig.primaryColor,
      logo_url: widgetConfig.logoUrl,
      auto_open: widgetConfig.autoOpen,
      greeting_message: widgetConfig.greetingMessage,
    }, { onConflict: "client_account_id" });
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Saved!", description: "Widget settings updated." });
  };

  const embedCode = `<script src="${window.location.origin}/chat-widget.js" data-client-id="${selectedClient}"></script>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    toast({ title: "Copied!", description: "Embed code copied to clipboard." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">AI Chat Qualifier</h1>
        <div className="flex gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {clients.map((c) => <option key={c.id} value={c.id}>{c.business_name}</option>)}
          </select>
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide Preview" : "Preview Widget"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget Settings */}
        <Card className="border-border/50 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Settings className="h-5 w-5 text-primary" /> Widget Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex gap-2 items-center">
                <input type="color" value={widgetConfig.primaryColor} onChange={(e) => setWidgetConfig((p) => ({ ...p, primaryColor: e.target.value }))} className="h-10 w-10 rounded cursor-pointer" />
                <Input value={widgetConfig.primaryColor} onChange={(e) => setWidgetConfig((p) => ({ ...p, primaryColor: e.target.value }))} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input value={widgetConfig.logoUrl} onChange={(e) => setWidgetConfig((p) => ({ ...p, logoUrl: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Greeting Message</Label>
              <Textarea value={widgetConfig.greetingMessage} onChange={(e) => setWidgetConfig((p) => ({ ...p, greetingMessage: e.target.value }))} rows={2} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-open on page load</Label>
              <Switch checked={widgetConfig.autoOpen} onCheckedChange={(v) => setWidgetConfig((p) => ({ ...p, autoOpen: v }))} />
            </div>
            <Button onClick={saveConfig} disabled={saving} variant="glow" className="w-full">
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Embed Code + Conversations */}
        <div className="space-y-6">
          <Card className="border-border/50 glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Copy className="h-5 w-5 text-primary" /> Embed Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted rounded-lg p-3 text-xs text-muted-foreground overflow-x-auto">{embedCode}</pre>
              <Button variant="outline" size="sm" className="mt-2" onClick={copyEmbed}>Copy Code</Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-primary" /> Recent Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <p className="text-muted-foreground text-sm">No conversations yet.</p>
              ) : (
                <div className="space-y-2">
                  {conversations.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <div>
                        <p className="text-sm text-foreground font-medium">{c.visitor_name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{c.visitor_email || c.visitor_phone || "No contact info"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={c.status === "qualified" ? "default" : c.status === "unqualified" ? "secondary" : "outline"}>
                          {c.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(c.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {selectedClient && <KnowledgePreview clientId={selectedClient} />}
        </div>
      </div>

      {/* Live Preview */}
      {showPreview && selectedClient && (
        <ChatQualifierWidget
          clientAccountId={selectedClient}
          primaryColor={widgetConfig.primaryColor}
          greeting={widgetConfig.greetingMessage}
          logoUrl={widgetConfig.logoUrl}
          autoOpen={true}
        />
      )}
    </div>
  );
};

export default ChatModule;
