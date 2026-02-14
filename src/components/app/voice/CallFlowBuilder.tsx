import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Phone, ArrowDown, MessageSquare, HelpCircle, Calendar, PhoneForwarded, UserCheck, AlertTriangle } from "lucide-react";

interface TransferRules {
  emergencyTransfer: boolean;
  emergencyNumber: string;
  afterHoursVoicemail: boolean;
  maxQualificationAttempts: number;
}

interface CallFlowBuilderProps {
  transferRules: TransferRules;
  onChange: (rules: TransferRules) => void;
}

const flowSteps = [
  { icon: Phone, label: "Incoming Call", description: "Call received from customer", color: "text-green-400" },
  { icon: MessageSquare, label: "Greeting", description: "AI answers with greeting script", color: "text-blue-400" },
  { icon: HelpCircle, label: "Qualification", description: "AI asks qualifying questions", color: "text-yellow-400" },
  { icon: UserCheck, label: "Decision", description: "AI determines if caller is qualified", color: "text-purple-400" },
  { icon: Calendar, label: "Book / Transfer", description: "Qualified → book appointment. Unqualified → capture info.", color: "text-primary" },
  { icon: PhoneForwarded, label: "Handoff", description: "Transfer to human if needed", color: "text-orange-400" },
];

export default function CallFlowBuilder({ transferRules, onChange }: CallFlowBuilderProps) {
  const update = (key: keyof TransferRules, value: any) => {
    onChange({ ...transferRules, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Call Flow</h3>
        <p className="text-sm text-muted-foreground">Visual representation of how the AI handles incoming calls</p>
      </div>

      {/* Visual flow */}
      <div className="flex flex-col items-center gap-1">
        {flowSteps.map((step, i) => (
          <div key={step.label} className="w-full max-w-md">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-background/50 ${step.color}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{i + 1}</Badge>
              </CardContent>
            </Card>
            {i < flowSteps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Transfer rules */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Transfer Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Emergency transfer enabled</Label>
            <Switch
              checked={transferRules.emergencyTransfer}
              onCheckedChange={(v) => update("emergencyTransfer", v)}
            />
          </div>
          {transferRules.emergencyTransfer && (
            <div>
              <Label className="text-xs text-muted-foreground">Emergency transfer number</Label>
              <Input
                value={transferRules.emergencyNumber}
                onChange={(e) => update("emergencyNumber", e.target.value)}
                placeholder="+1 (403) 555-0199"
                className="mt-1"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label className="text-sm">After-hours voicemail</Label>
            <Switch
              checked={transferRules.afterHoursVoicemail}
              onCheckedChange={(v) => update("afterHoursVoicemail", v)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Max qualification attempts before transfer</Label>
            <Input
              type="number"
              min={1}
              max={10}
              value={transferRules.maxQualificationAttempts}
              onChange={(e) => update("maxQualificationAttempts", parseInt(e.target.value) || 3)}
              className="mt-1 w-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
