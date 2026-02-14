import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { WizardData } from "@/pages/app/OnboardingWizard";

interface Props {
  data: WizardData;
  update: (partial: Partial<WizardData>) => void;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Step3Calendar = ({ data, update }: Props) => {
  const avail = data.calendarAvailability;

  const updateDay = (day: string, field: string, value: any) => {
    update({
      calendarAvailability: {
        ...avail,
        [day]: { ...((avail as any)[day] || { start: "09:00", end: "17:00", enabled: false }), [field]: value },
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Set booking availability. Google Calendar integration coming in a future update.</p>

      <div className="grid grid-cols-1 gap-3">
        {days.map((day) => {
          const d = (avail as any)[day] || { start: "09:00", end: "17:00", enabled: false };
          return (
            <div key={day} className="flex items-center gap-3 bg-muted/30 rounded-lg p-3">
              <Switch checked={d.enabled} onCheckedChange={(v) => updateDay(day, "enabled", v)} />
              <span className="w-24 text-sm text-foreground font-medium">{day}</span>
              <Input type="time" value={d.start} onChange={(e) => updateDay(day, "start", e.target.value)} className="w-28" disabled={!d.enabled} />
              <span className="text-muted-foreground text-sm">to</span>
              <Input type="time" value={d.end} onChange={(e) => updateDay(day, "end", e.target.value)} className="w-28" disabled={!d.enabled} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Buffer Time (minutes)</Label>
          <Input type="number" value={data.bufferTime} onChange={(e) => update({ bufferTime: Number(e.target.value) })} />
        </div>
        <div className="space-y-2">
          <Label>Appointment Duration (minutes)</Label>
          <Input type="number" value={data.appointmentDuration} onChange={(e) => update({ appointmentDuration: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  );
};

export default Step3Calendar;
