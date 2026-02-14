import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Clients = () => {
  const { agencyId } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agencyId) { setLoading(false); return; }
    supabase
      .from("client_accounts")
      .select("*")
      .eq("agency_id", agencyId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setClients(data || []);
        setLoading(false);
      });
  }, [agencyId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Client Accounts</h1>
        <Button asChild variant="glow">
          <Link to="/app/onboarding"><Plus className="h-4 w-4 mr-1" /> New Client</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : clients.length === 0 ? (
        <Card className="border-border/50 glass">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-heading text-foreground mb-2">No clients yet</h3>
            <p className="text-muted-foreground mb-4">Onboard your first client to get started.</p>
            <Button asChild variant="glow">
              <Link to="/app/onboarding"><Plus className="h-4 w-4 mr-1" /> Onboard Client</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {clients.map((c) => (
            <Card key={c.id} className="border-border/50 glass">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{c.business_name}</h3>
                    <p className="text-sm text-muted-foreground">{c.industry} • {c.service_area}</p>
                  </div>
                </div>
                <Badge variant={c.status === "active" ? "default" : "secondary"}>{c.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
