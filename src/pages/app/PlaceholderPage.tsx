import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
  round: number;
}

const PlaceholderPage = ({ title, description, round }: PlaceholderPageProps) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-heading font-bold text-foreground">{title}</h1>
    <Card className="border-border/50 glass">
      <CardContent className="p-6">
        <p className="text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">Scheduled for Round {round}</p>
      </CardContent>
    </Card>
  </div>
);

export default PlaceholderPage;
