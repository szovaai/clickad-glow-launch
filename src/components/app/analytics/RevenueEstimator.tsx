import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, PhoneIncoming, Calendar } from "lucide-react";

interface RevenueEstimatorProps {
  totalCalls: number;
  bookedAppointments: number;
  qualifiedLeads: number;
}

export default function RevenueEstimator({ totalCalls, bookedAppointments, qualifiedLeads }: RevenueEstimatorProps) {
  const [avgJobValue, setAvgJobValue] = useState(2500);
  const [closeRate, setCloseRate] = useState(60);

  const estimatedRevenue = bookedAppointments * (closeRate / 100) * avgJobValue;
  const missedRevenue = (totalCalls - bookedAppointments) * 0.3 * avgJobValue;
  const revenuePerLead = qualifiedLeads > 0 ? estimatedRevenue / qualifiedLeads : 0;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Revenue Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Avg Job Value ($)</Label>
            <Input
              type="number"
              value={avgJobValue}
              onChange={(e) => setAvgJobValue(parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Close Rate (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={closeRate}
              onChange={(e) => setCloseRate(parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-background/50 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-foreground">${estimatedRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Estimated Revenue</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 text-center">
            <PhoneIncoming className="w-5 h-5 mx-auto mb-1 text-destructive" />
            <p className="text-lg font-bold text-foreground">${missedRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Potential Missed</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 text-center">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-foreground">${revenuePerLead.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Per Qualified Lead</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
