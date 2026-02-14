import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare, Calendar, TrendingUp, Users, Zap } from "lucide-react";

const statCards = [
  { title: "Total Calls", value: "—", icon: Phone, desc: "Coming in Round 4" },
  { title: "AI Conversations", value: "—", icon: MessageSquare, desc: "Coming in Round 3" },
  { title: "Bookings", value: "—", icon: Calendar, desc: "Coming in Round 3" },
  { title: "Conversion Rate", value: "—", icon: TrendingUp, desc: "Coming in Round 6" },
];

const Dashboard = () => {
  const { profile, isAgencyUser, roles } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAgencyUser ? "Agency Dashboard" : "Client Dashboard"} • Role: {roles.join(", ") || "No role assigned"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-border/50 glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAgencyUser && (
        <Card className="border-border/50 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Client Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Client management will be available in the Clients module. Use the sidebar to navigate.</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20 glow-border">
        <CardContent className="flex items-center gap-4 p-6">
          <Zap className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">System Status</h3>
            <p className="text-sm text-muted-foreground">Round 1 complete — Auth, roles, and app shell are live. Next: Client onboarding wizard.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
