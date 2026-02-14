import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Calendar, PhoneForwarded, Save } from "lucide-react";

interface Scripts {
  greeting: string;
  qualification: string;
  booking: string;
}

interface ScriptBuilderProps {
  scripts: Scripts;
  onChange: (scripts: Scripts) => void;
  onSave: () => void;
  saving: boolean;
}

const scriptSections = [
  {
    key: "greeting" as const,
    label: "Greeting Script",
    icon: MessageSquare,
    placeholder: "Hello! Thank you for calling {{business_name}}. My name is Alex, your AI assistant. How can I help you today?",
    hint: "First thing the AI says when answering. Use {{business_name}} for dynamic insertion.",
  },
  {
    key: "qualification" as const,
    label: "Qualification Script",
    icon: HelpCircle,
    placeholder: "I'd be happy to help! To make sure I connect you with the right person, could you tell me:\n1. What type of service you're looking for?\n2. Your approximate timeline?\n3. Do you have a budget range in mind?",
    hint: "Questions the AI asks to qualify the caller. The AI will adapt based on responses.",
  },
  {
    key: "booking" as const,
    label: "Booking Script",
    icon: Calendar,
    placeholder: "Great news! Based on what you've told me, we'd love to schedule a consultation. I have availability on {{available_slots}}. Which time works best for you?",
    hint: "Script used when the caller is qualified and ready to book. Use {{available_slots}} for calendar integration.",
  },
];

export default function ScriptBuilder({ scripts, onChange, onSave, saving }: ScriptBuilderProps) {
  const updateScript = (key: keyof Scripts, value: string) => {
    onChange({ ...scripts, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Script Builder</h3>
          <p className="text-sm text-muted-foreground">Configure what the AI receptionist says at each stage of a call</p>
        </div>
        <Button onClick={onSave} disabled={saving} size="sm">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving…" : "Save Scripts"}
        </Button>
      </div>

      {scriptSections.map((section) => (
        <Card key={section.key} className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <section.icon className="w-4 h-4 text-primary" />
              {section.label}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{section.hint}</p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={scripts[section.key]}
              onChange={(e) => updateScript(section.key, e.target.value)}
              placeholder={section.placeholder}
              className="min-h-[120px] bg-background/50"
              rows={5}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
