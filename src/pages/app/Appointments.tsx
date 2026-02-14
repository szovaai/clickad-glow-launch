import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, CheckCircle2, XCircle, Bell, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ClientSelector from "@/components/app/shared/ClientSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Appointment {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_type: string | null;
  scheduled_at: string;
  duration_minutes: number;
  notes: string | null;
  status: string;
  reminder_24h_sent: boolean;
  reminder_1h_sent: boolean;
  created_at: string;
}

export default function Appointments() {
  const { agencyId } = useAuth();
  const [clientId, setClientId] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    service_type: "",
    scheduled_at: "",
    duration_minutes: 60,
    notes: "",
  });

  const fetchAppointments = async () => {
    if (!clientId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_account_id", clientId)
      .order("scheduled_at", { ascending: true });
    setLoading(false);
    if (error) toast.error(error.message);
    else setAppointments((data as any) || []);
  };

  useEffect(() => {
    fetchAppointments();
  }, [clientId]);

  const handleCreate = async () => {
    if (!form.customer_name || !form.customer_phone || !form.scheduled_at) {
      toast.error("Name, phone, and date/time are required");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("appointments").insert({
      client_account_id: clientId,
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      customer_email: form.customer_email || null,
      service_type: form.service_type || null,
      scheduled_at: new Date(form.scheduled_at).toISOString(),
      duration_minutes: form.duration_minutes,
      notes: form.notes || null,
    } as any);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Appointment created");
      setForm({ customer_name: "", customer_phone: "", customer_email: "", service_type: "", scheduled_at: "", duration_minutes: 60, notes: "" });
      setDialogOpen(false);
      fetchAppointments();
    }
  };

  const cancelAppointment = async (id: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" } as any)
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Appointment cancelled");
      fetchAppointments();
    }
  };

  const statusColor = (s: string) => {
    if (s === "confirmed") return "default";
    if (s === "cancelled") return "destructive";
    if (s === "completed") return "secondary";
    return "outline";
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });

  if (!clientId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" /> Appointments
        </h1>
        <ClientSelector value={clientId} onChange={setClientId} />
        <Card className="border-border/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            Select a client to manage appointments.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" /> Appointments
        </h1>
        <div className="flex items-center gap-3">
          <ClientSelector value={clientId} onChange={setClientId} />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-1" /> New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Customer Name *</Label><Input value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} /></div>
                <div><Label>Phone *</Label><Input value={form.customer_phone} onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))} placeholder="+1234567890" /></div>
                <div><Label>Email</Label><Input value={form.customer_email} onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))} /></div>
                <div><Label>Service Type</Label><Input value={form.service_type} onChange={(e) => setForm((f) => ({ ...f, service_type: e.target.value }))} placeholder="e.g. Consultation" /></div>
                <div><Label>Date & Time *</Label><Input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))} /></div>
                <div><Label>Duration (min)</Label><Input type="number" value={form.duration_minutes} onChange={(e) => setForm((f) => ({ ...f, duration_minutes: +e.target.value }))} /></div>
                <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} /></div>
                <Button onClick={handleCreate} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null} Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : appointments.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            No appointments yet. Create one to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <Card key={appt.id} className={`border-border/50 ${appt.status === "cancelled" ? "opacity-60" : ""}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{appt.customer_name}</CardTitle>
                  <Badge variant={statusColor(appt.status) as any}>{appt.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(appt.scheduled_at)} · {appt.duration_minutes}min</span>
                </div>
                <div className="text-muted-foreground">{appt.customer_phone}</div>
                {appt.service_type && <div className="text-muted-foreground">Service: {appt.service_type}</div>}
                {appt.notes && <div className="text-xs text-muted-foreground italic">{appt.notes}</div>}
                <div className="flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1 text-xs">
                    <Bell className="w-3 h-3" /> 24h:
                    {appt.reminder_24h_sent ? <CheckCircle2 className="w-3 h-3 text-primary" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <Bell className="w-3 h-3" /> 1h:
                    {appt.reminder_1h_sent ? <CheckCircle2 className="w-3 h-3 text-primary" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
                  </span>
                </div>
                {appt.status === "confirmed" && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive w-full mt-1" onClick={() => cancelAppointment(appt.id)}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
