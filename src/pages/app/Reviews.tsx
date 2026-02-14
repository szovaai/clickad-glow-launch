import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ClientSelector from "@/components/app/shared/ClientSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Copy, Check, Send, Loader2, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  customer_name: string;
  customer_phone: string;
  rating: number | null;
  quote: string | null;
  role: string | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
  token: string;
}

export default function Reviews() {
  const { isAgencyUser } = useAuth();
  const [clientId, setClientId] = useState(() => localStorage.getItem("selectedClientId") || "");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Google Review URL
  const [googleUrl, setGoogleUrl] = useState("");
  const [savingUrl, setSavingUrl] = useState(false);

  // Request dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (clientId) {
      localStorage.setItem("selectedClientId", clientId);
      loadReviews();
      loadGoogleUrl();
    }
  }, [clientId]);

  async function loadGoogleUrl() {
    const { data } = await supabase
      .from("client_accounts")
      .select("google_review_url")
      .eq("id", clientId)
      .single();
    setGoogleUrl((data as any)?.google_review_url || "");
  }

  async function saveGoogleUrl() {
    setSavingUrl(true);
    await supabase.from("client_accounts").update({ google_review_url: googleUrl.trim() || null } as any).eq("id", clientId);
    setSavingUrl(false);
    toast({ title: "Google Review URL saved!" });
  }

  async function loadReviews() {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("client_account_id", clientId)
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) || []);
    setLoading(false);
  }

  async function updateStatus(reviewId: string, newStatus: string) {
    await supabase.from("reviews").update({ status: newStatus }).eq("id", reviewId);
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r))
    );
    toast({ title: `Review ${newStatus}` });
  }

  async function sendRequest() {
    if (!reqName.trim() || !reqPhone.trim()) return;
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await supabase.functions.invoke("send-review-request", {
        body: {
          client_account_id: clientId,
          customer_name: reqName.trim(),
          customer_phone: reqPhone.trim(),
        },
      });

      if (resp.error) throw resp.error;

      toast({
        title: "Review request sent!",
        description: resp.data?.sms_sent
          ? "SMS delivered successfully."
          : "Review created (SMS not configured).",
      });
      setDialogOpen(false);
      setReqName("");
      setReqPhone("");
      loadReviews();
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to send", variant: "destructive" });
    }
    setSending(false);
  }

  function copyQuote(review: Review) {
    const text = `"${review.quote}" — ${review.customer_name}${review.role ? `, ${review.role}` : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedId(review.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filtered = statusFilter === "all" ? reviews : reviews.filter((r) => r.status === statusFilter);

  const statusBadge = (status: string) => {
    const map: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={map[status] || "outline"}>{status}</Badge>;
  };

  if (!clientId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        <ClientSelector value={clientId} onChange={setClientId} />
        <p className="text-muted-foreground mt-4">Select a client to manage reviews.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground text-sm">Collect and manage client testimonials</p>
        </div>
        <div className="flex items-center gap-3">
          <ClientSelector value={clientId} onChange={setClientId} />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Send className="h-4 w-4 mr-2" />Request Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Review Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    placeholder="John Smith"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={reqPhone}
                    onChange={(e) => setReqPhone(e.target.value)}
                    placeholder="+1 403 555 1234"
                    maxLength={30}
                  />
                </div>
                <Button onClick={sendRequest} disabled={sending} className="w-full">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Send SMS Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Google Review Redirect Config */}
      {isAgencyUser && (
        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground text-sm">Google Review Redirect</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            When customers rate 4-5 stars, they'll be redirected to leave a Google review. Lower ratings are captured as private feedback.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="https://g.page/r/YOUR_BUSINESS/review"
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={saveGoogleUrl} disabled={savingUrl}>
              {savingUrl ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <Button
            key={s}
            variant={statusFilter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No reviews found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{r.customer_name}</span>
                    {statusBadge(r.status)}
                  </div>
                  {r.rating && (
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= r.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                      ))}
                    </div>
                  )}
                  {r.quote && (
                    <p className="text-sm text-muted-foreground italic truncate">"{r.quote}"</p>
                  )}
                  {r.role && <p className="text-xs text-muted-foreground mt-1">— {r.role}</p>}
                  {!r.submitted_at && <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {r.quote && r.status === "approved" && (
                    <Button variant="ghost" size="icon" onClick={() => copyQuote(r)} title="Copy">
                      {copiedId === r.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                  {isAgencyUser && r.submitted_at && r.status === "pending" && (
                    <>
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(r.id, "approved")} title="Approve">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(r.id, "rejected")} title="Reject">
                        <ThumbsDown className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
