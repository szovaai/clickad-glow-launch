import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const Step6KnowledgeBase = ({ data, update }: Props) => {
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const [objection, setObjection] = useState("");
  const [response, setResponse] = useState("");

  const addFaq = () => {
    if (faqQ.trim() && faqA.trim()) {
      update({ faqs: [...data.faqs, { question: faqQ.trim(), answer: faqA.trim() }] });
      setFaqQ("");
      setFaqA("");
    }
  };

  const addObjection = () => {
    if (objection.trim() && response.trim()) {
      update({ objectionResponses: [...data.objectionResponses, { objection: objection.trim(), response: response.trim() }] });
      setObjection("");
      setResponse("");
    }
  };

  return (
    <div className="space-y-5">
      {/* FAQs */}
      <div className="space-y-2">
        <Label className="font-medium">FAQs</Label>
        <div className="space-y-2">
          <Input value={faqQ} onChange={(e) => setFaqQ(e.target.value)} placeholder="Question" />
          <Input value={faqA} onChange={(e) => setFaqA(e.target.value)} placeholder="Answer" />
          <Button type="button" size="sm" onClick={addFaq}><Plus className="h-3 w-3 mr-1" /> Add FAQ</Button>
        </div>
        {data.faqs.map((f, i) => (
          <div key={i} className="bg-muted/30 rounded p-3 text-sm">
            <div className="flex justify-between">
              <strong className="text-foreground">Q: {f.question}</strong>
              <button onClick={() => update({ faqs: data.faqs.filter((_, idx) => idx !== i) })} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
            </div>
            <p className="text-muted-foreground mt-1">A: {f.answer}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Service Descriptions</Label>
        <Textarea value={data.serviceDescriptions} onChange={(e) => update({ serviceDescriptions: e.target.value })} rows={3} placeholder="Describe services offered..." />
      </div>

      <div className="space-y-2">
        <Label>Pricing Ranges</Label>
        <Textarea value={data.pricingRanges} onChange={(e) => update({ pricingRanges: e.target.value })} rows={2} placeholder="e.g. Panel upgrades: $2,000 - $5,000" />
      </div>

      <div className="space-y-2">
        <Label>Policies</Label>
        <Textarea value={data.policies} onChange={(e) => update({ policies: e.target.value })} rows={2} placeholder="Cancellation policy, warranty info..." />
      </div>

      {/* Objection Responses */}
      <div className="space-y-2">
        <Label className="font-medium">Objection Responses</Label>
        <div className="space-y-2">
          <Input value={objection} onChange={(e) => setObjection(e.target.value)} placeholder="Common objection" />
          <Input value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Suggested response" />
          <Button type="button" size="sm" onClick={addObjection}><Plus className="h-3 w-3 mr-1" /> Add Response</Button>
        </div>
        {data.objectionResponses.map((o, i) => (
          <div key={i} className="bg-muted/30 rounded p-3 text-sm">
            <div className="flex justify-between">
              <strong className="text-foreground">Objection: {o.objection}</strong>
              <button onClick={() => update({ objectionResponses: data.objectionResponses.filter((_, idx) => idx !== i) })} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
            </div>
            <p className="text-muted-foreground mt-1">Response: {o.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step6KnowledgeBase;
