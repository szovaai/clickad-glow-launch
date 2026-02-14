import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const Step2Qualification = ({ data, update }: Props) => {
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim()) {
      update({ customQuestions: [...data.customQuestions, newQuestion.trim()] });
      setNewQuestion("");
    }
  };

  const removeQuestion = (idx: number) => {
    update({ customQuestions: data.customQuestions.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Budget Minimum ($)</Label>
        <Input type="number" value={data.budgetMin || ""} onChange={(e) => update({ budgetMin: Number(e.target.value) })} placeholder="500" />
      </div>

      <div className="space-y-2">
        <Label>Job Type Filters</Label>
        <Input
          value={data.jobTypeFilters.join(", ")}
          onChange={(e) => update({ jobTypeFilters: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="Residential, Commercial (comma-separated)"
        />
      </div>

      <div className="space-y-2">
        <Label>Location Filters</Label>
        <Input
          value={data.locationFilters.join(", ")}
          onChange={(e) => update({ locationFilters: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="Calgary, Airdrie, Cochrane (comma-separated)"
        />
      </div>

      <div className="space-y-2">
        <Label>Timeline Question</Label>
        <Input value={data.timelineQuestion} onChange={(e) => update({ timelineQuestion: e.target.value })} placeholder="When do you need this done?" />
      </div>

      <div className="space-y-2">
        <Label>Custom Qualification Questions</Label>
        <div className="flex gap-2">
          <Input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Add a custom question..." onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addQuestion())} />
          <Button type="button" size="sm" onClick={addQuestion}><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-1 mt-2">
          {data.customQuestions.map((q, i) => (
            <div key={i} className="flex items-center justify-between bg-muted/50 rounded px-3 py-2 text-sm">
              <span className="text-foreground">{q}</span>
              <button onClick={() => removeQuestion(i)} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2Qualification;
