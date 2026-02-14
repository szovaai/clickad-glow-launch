import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react";
import type { KPIData } from "./KPICards";

interface WeeklySummaryProps {
  current: KPIData;
  previous: KPIData;
}

function trend(current: number, previous: number) {
  if (previous === 0) return { pct: 0, direction: "flat" as const };
  const pct = ((current - previous) / previous) * 100;
  return { pct, direction: pct > 2 ? "up" as const : pct < -2 ? "down" as const : "flat" as const };
}

const TrendIcon = ({ direction }: { direction: "up" | "down" | "flat" }) => {
  if (direction === "up") return <TrendingUp className="w-4 h-4 text-primary" />;
  if (direction === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export default function WeeklySummary({ current, previous }: WeeklySummaryProps) {
  const callsTrend = trend(current.totalCalls, previous.totalCalls);
  const bookingsTrend = trend(current.bookedAppointments, previous.bookedAppointments);
  const recoveryTrend = trend(current.recoveredCalls, previous.recoveredCalls);

  const suggestions: string[] = [];
  if (current.missedCalls > current.answeredCalls * 0.3) {
    suggestions.push("High missed-call rate — consider extending business hours or enabling after-hours AI.");
  }
  if (current.conversionRate < 20) {
    suggestions.push("Low conversion rate — review qualification scripts and follow-up sequences.");
  }
  if (current.recoveredCalls < current.missedCalls * 0.3) {
    suggestions.push("Recovery rate is low — ensure text-back messages include a clear booking link.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Looking good! Metrics are trending positively this week.");
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-base">Weekly Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <TrendIcon direction={callsTrend.direction} />
            <div>
              <p className="text-sm font-medium text-foreground">{callsTrend.pct > 0 ? "+" : ""}{callsTrend.pct.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Calls</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendIcon direction={bookingsTrend.direction} />
            <div>
              <p className="text-sm font-medium text-foreground">{bookingsTrend.pct > 0 ? "+" : ""}{bookingsTrend.pct.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendIcon direction={recoveryTrend.direction} />
            <div>
              <p className="text-sm font-medium text-foreground">{recoveryTrend.pct > 0 ? "+" : ""}{recoveryTrend.pct.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Recovery</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-3 space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
