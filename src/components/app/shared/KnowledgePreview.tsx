import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KnowledgePreviewProps {
  clientId: string;
}

const CATEGORIES = ["business_info", "services", "faqs", "policies", "qualification_rules", "objections", "links_assets"];
const LABELS: Record<string, string> = {
  business_info: "Business Info",
  services: "Services",
  faqs: "FAQs",
  policies: "Policies",
  qualification_rules: "Qualification",
  objections: "Objections",
  links_assets: "Links & Assets",
};

export default function KnowledgePreview({ clientId }: KnowledgePreviewProps) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!clientId) return;
    supabase
      .from("client_configs")
      .select("knowledge_base")
      .eq("client_account_id", clientId)
      .maybeSingle()
      .then(({ data }) => {
        const kb = (data?.knowledge_base as Record<string, any[]>) || {};
        const c: Record<string, number> = {};
        CATEGORIES.forEach((cat) => {
          c[cat] = Array.isArray(kb[cat]) ? kb[cat].length : 0;
        });
        setCounts(c);
      });
  }, [clientId]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <Card className="border-border/50 glass">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          Knowledge Base ({total} items)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex justify-between">
              <span>{LABELS[cat]}</span>
              <span className="font-medium text-foreground">{counts[cat] || 0}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => navigate("/app/knowledge-base")}>
          Open Knowledge Base
        </Button>
      </CardContent>
    </Card>
  );
}
