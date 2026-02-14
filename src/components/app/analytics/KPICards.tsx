import { Card, CardContent } from "@/components/ui/card";
import { Phone, PhoneOff, Calendar, UserCheck, Clock, TrendingUp, PhoneIncoming, RotateCcw } from "lucide-react";

interface KPIData {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  bookedAppointments: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  recoveredCalls: number;
}

interface KPICardsProps {
  data: KPIData;
  loading?: boolean;
}

const kpis = [
  { key: "totalCalls" as const, label: "Total Calls", icon: PhoneIncoming, format: "number" },
  { key: "answeredCalls" as const, label: "Answered", icon: Phone, format: "number" },
  { key: "missedCalls" as const, label: "Missed", icon: PhoneOff, format: "number" },
  { key: "recoveredCalls" as const, label: "Recovered", icon: RotateCcw, format: "number" },
  { key: "qualifiedLeads" as const, label: "Qualified", icon: UserCheck, format: "number" },
  { key: "bookedAppointments" as const, label: "Booked", icon: Calendar, format: "number" },
  { key: "conversionRate" as const, label: "Conversion", icon: TrendingUp, format: "percent" },
  { key: "avgResponseTime" as const, label: "Avg Response", icon: Clock, format: "seconds" },
];

function formatValue(value: number, format: string) {
  if (format === "percent") return `${value.toFixed(1)}%`;
  if (format === "seconds") return `${value.toFixed(0)}s`;
  return value.toLocaleString();
}

export default function KPICards({ data, loading }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.key} className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
              <kpi.icon className="w-4 h-4 text-primary/70" />
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-muted/30 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-foreground">
                {formatValue(data[kpi.key], kpi.format)}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export type { KPIData };
