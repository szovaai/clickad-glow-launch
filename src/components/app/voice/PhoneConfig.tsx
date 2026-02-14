import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Phone, Save } from "lucide-react";

interface PhoneSettings {
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioPhoneNumber: string;
  missedCallTextBack: boolean;
  autoReplyMessage: string;
}

interface PhoneConfigProps {
  settings: PhoneSettings;
  onChange: (settings: PhoneSettings) => void;
  onSave: () => void;
  saving: boolean;
}

export type { PhoneSettings };

export default function PhoneConfig({ settings, onChange, onSave, saving }: PhoneConfigProps) {
  const update = (key: keyof PhoneSettings, value: string | boolean) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Phone Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Connect a Twilio phone number so the AI receptionist can handle calls
          </p>
        </div>
        <Button onClick={onSave} disabled={saving} size="sm">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving…" : "Save Phone Config"}
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Twilio Credentials
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Find these in your{" "}
            <a
              href="https://console.twilio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Twilio Console
            </a>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Account SID</Label>
            <Input
              value={settings.twilioAccountSid}
              onChange={(e) => update("twilioAccountSid", e.target.value)}
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="mt-1 font-mono text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Auth Token</Label>
            <Input
              type="password"
              value={settings.twilioAuthToken}
              onChange={(e) => update("twilioAuthToken", e.target.value)}
              placeholder="••••••••••••••••••••••••••••••••"
              className="mt-1 font-mono text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Twilio Phone Number</Label>
            <Input
              value={settings.twilioPhoneNumber}
              onChange={(e) => update("twilioPhoneNumber", e.target.value)}
              placeholder="+14035551234"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Missed Call Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Missed-Call Text-Back</Label>
              <p className="text-xs text-muted-foreground">Auto-send SMS when a call is missed</p>
            </div>
            <Switch
              checked={settings.missedCallTextBack}
              onCheckedChange={(v) => update("missedCallTextBack", v)}
            />
          </div>
          {settings.missedCallTextBack && (
            <div>
              <Label className="text-sm">Auto-Reply Message</Label>
              <Input
                value={settings.autoReplyMessage}
                onChange={(e) => update("autoReplyMessage", e.target.value)}
                placeholder="Sorry we missed your call! Book a time here: [Link]"
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
