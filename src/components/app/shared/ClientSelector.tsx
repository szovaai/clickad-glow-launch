import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ClientSelectorProps {
  value: string;
  onChange: (clientId: string) => void;
  className?: string;
}

export default function ClientSelector({ value, onChange, className }: ClientSelectorProps) {
  const { agencyId } = useAuth();
  const [clients, setClients] = useState<{ id: string; business_name: string }[]>([]);

  useEffect(() => {
    if (!agencyId) return;
    supabase
      .from("client_accounts")
      .select("id, business_name")
      .eq("agency_id", agencyId)
      .then(({ data }) => {
        const list = data || [];
        setClients(list);
        if (list.length && !value) onChange(list[0].id);
      });
  }, [agencyId]);

  if (clients.length <= 1 && clients.length > 0 && !value) {
    // auto-select
    onChange(clients[0].id);
  }

  return (
    <select
      className={`rounded-md border border-input bg-background px-3 py-2 text-sm ${className || ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select a client…</option>
      {clients.map((c) => (
        <option key={c.id} value={c.id}>{c.business_name}</option>
      ))}
    </select>
  );
}
