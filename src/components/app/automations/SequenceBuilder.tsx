import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Step {
  type: "sms" | "email";
  body: string;
  subject?: string;
  delayHours: number;
}

interface SequenceBuilderProps {
  initialSteps?: Step[];
  onSave: (steps: Step[]) => void;
  saving?: boolean;
}

const SequenceBuilder = ({ initialSteps, onSave, saving }: SequenceBuilderProps) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps || [
    { type: "sms", body: "Hi {{name}}, thanks for reaching out! Ready to get started?", delayHours: 0 },
  ]);

  const addStep = () => {
    setSteps([...steps, { type: "sms", body: "", delayHours: 24 }]);
  };

  const removeStep = (idx: number) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const updateStep = (idx: number, partial: Partial<Step>) => {
    setSteps(steps.map((s, i) => (i === idx ? { ...s, ...partial } : s)));
  };

  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <Card key={i} className="border-border/50 bg-muted/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Step {i + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="rounded border border-input bg-background px-2 py-1 text-xs"
                  value={step.type}
                  onChange={(e) => updateStep(i, { type: e.target.value as "sms" | "email" })}
                >
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
                {steps.length > 1 && (
                  <button onClick={() => removeStep(i)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {i > 0 && (
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Delay:</Label>
                <Input
                  type="number"
                  value={step.delayHours}
                  onChange={(e) => updateStep(i, { delayHours: Number(e.target.value) })}
                  className="w-20 h-8 text-xs"
                />
                <span className="text-xs text-muted-foreground">hours after previous step</span>
              </div>
            )}

            {step.type === "email" && (
              <div className="space-y-1">
                <Label className="text-xs">Subject</Label>
                <Input value={step.subject || ""} onChange={(e) => updateStep(i, { subject: e.target.value })} placeholder="Follow-up: Your inquiry" className="h-8 text-sm" />
              </div>
            )}

            <div className="space-y-1">
              <Label className="text-xs">Message</Label>
              <Textarea
                value={step.body}
                onChange={(e) => updateStep(i, { body: e.target.value })}
                rows={3}
                placeholder="Hi {{name}}, ..."
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">Use {"{{name}}"} for contact name</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={addStep}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Step
        </Button>
        <Button variant="glow" size="sm" onClick={() => onSave(steps)} disabled={saving}>
          {saving ? "Saving..." : "Save Sequence"}
        </Button>
      </div>
    </div>
  );
};

export default SequenceBuilder;
