import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Clients = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-heading font-bold text-foreground">Client Accounts</h1>
    <Card className="border-border/50 glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-primary" />
          Manage Clients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Client onboarding wizard and management coming in Round 2.</p>
      </CardContent>
    </Card>
  </div>
);

export default Clients;
