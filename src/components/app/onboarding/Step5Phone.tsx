import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const Step5Phone = ({ data, update }: Props) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label>Phone Number (Twilio or GHL)</Label>
      <Input value={data.phoneNumber} onChange={(e) => update({ phoneNumber: e.target.value })} placeholder="+14035551234" />
    </div>

    <div className="flex items-center justify-between">
      <div>
        <Label>Missed-Call Text-Back</Label>
        <p className="text-xs text-muted-foreground">Auto-send SMS when a call is missed</p>
      </div>
      <Switch checked={data.missedCallTextBack} onCheckedChange={(v) => update({ missedCallTextBack: v })} />
    </div>

    <div className="space-y-2">
      <Label>Auto-Reply Message</Label>
      <Textarea
        value={data.autoReplyMessage}
        onChange={(e) => update({ autoReplyMessage: e.target.value })}
        rows={3}
        placeholder="Sorry we missed your call! Want to book a time? Click here: [Link]"
      />
    </div>

    <div className="flex items-center justify-between">
      <div>
        <Label>Speed-to-Lead Auto-Call</Label>
        <p className="text-xs text-muted-foreground">Trigger instant callback on new leads</p>
      </div>
      <Switch checked={data.speedToLead} onCheckedChange={(v) => update({ speedToLead: v })} />
    </div>
  </div>
);

export default Step5Phone;
