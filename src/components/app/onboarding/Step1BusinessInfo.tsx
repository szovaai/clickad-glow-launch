import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const industries = ["Electrician", "Plumber", "HVAC", "Roofing", "Renovation", "Landscaping", "Cleaning", "Dental", "Legal", "Other"];

const Step1BusinessInfo = ({ data, update }: Props) => {
  const handleServicesChange = (val: string) => {
    update({ services: val.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Business Name *</Label>
        <Input value={data.businessName} onChange={(e) => update({ businessName: e.target.value })} placeholder="Acme Services Ltd." />
      </div>

      <div className="space-y-2">
        <Label>Industry</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={data.industry}
          onChange={(e) => update({ industry: e.target.value })}
        >
          <option value="">Select industry...</option>
          {industries.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Services Offered</Label>
        <Input
          value={data.services.join(", ")}
          onChange={(e) => handleServicesChange(e.target.value)}
          placeholder="Panel upgrades, Wiring, Lighting (comma-separated)"
        />
      </div>

      <div className="space-y-2">
        <Label>Service Area</Label>
        <Input value={data.serviceArea} onChange={(e) => update({ serviceArea: e.target.value })} placeholder="Calgary and surrounding area" />
      </div>

      <div className="flex items-center justify-between">
        <Label>Emergency Hours Available?</Label>
        <Switch checked={data.emergencyHours} onCheckedChange={(val) => update({ emergencyHours: val })} />
      </div>
    </div>
  );
};

export default Step1BusinessInfo;
