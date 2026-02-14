import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const Step4GHL = ({ data, update }: Props) => {
  const updateStage = (key: string, value: string) => {
    update({ ghlStageMapping: { ...data.ghlStageMapping, [key]: value } });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Connect GoHighLevel to sync contacts, opportunities, and trigger workflows.</p>

      <div className="space-y-2">
        <Label>GHL API Key</Label>
        <Input type="password" value={data.ghlApiKey} onChange={(e) => update({ ghlApiKey: e.target.value })} placeholder="eyJhbGc..." />
      </div>

      <div className="space-y-2">
        <Label>Location ID</Label>
        <Input value={data.ghlLocationId} onChange={(e) => update({ ghlLocationId: e.target.value })} placeholder="loc_xxxxxxxxx" />
      </div>

      <div className="space-y-2">
        <Label>Pipeline ID</Label>
        <Input value={data.ghlPipelineId} onChange={(e) => update({ ghlPipelineId: e.target.value })} placeholder="pipe_xxxxxxxxx" />
      </div>

      <div className="space-y-3">
        <Label className="text-foreground font-medium">Stage Mapping</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">New Lead Stage ID</Label>
            <Input value={data.ghlStageMapping.newLead} onChange={(e) => updateStage("newLead", e.target.value)} placeholder="stage_xxx" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Booked Stage ID</Label>
            <Input value={data.ghlStageMapping.booked} onChange={(e) => updateStage("booked", e.target.value)} placeholder="stage_xxx" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Qualified Stage ID</Label>
            <Input value={data.ghlStageMapping.qualified} onChange={(e) => updateStage("qualified", e.target.value)} placeholder="stage_xxx" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Lost Stage ID</Label>
            <Input value={data.ghlStageMapping.lost} onChange={(e) => updateStage("lost", e.target.value)} placeholder="stage_xxx" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4GHL;
