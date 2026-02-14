import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReviewData {
  id: string;
  customer_name: string;
  status: string;
  submitted_at: string | null;
  client_account_id: string;
}

export default function ReviewSubmission() {
  const { token } = useParams<{ token: string }>();
  const [review, setReview] = useState<ReviewData | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!token) return;
    loadReview();
  }, [token]);

  async function loadReview() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, customer_name, status, submitted_at, client_account_id")
      .eq("token", token!)
      .single();

    if (error || !data) {
      setError("Review not found or has expired.");
      setLoading(false);
      return;
    }

    if (data.submitted_at || data.status !== "pending") {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    setReview(data as ReviewData);

    // Get business name
    const { data: client } = await supabase
      .from("client_accounts")
      .select("business_name")
      .eq("id", data.client_account_id)
      .single();

    setBusinessName(client?.business_name || "");
    setLoading(false);
  }

  async function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (quote.trim().length < 5) {
      setError("Please write a short review (at least 5 characters).");
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: updateError } = await supabase
      .from("reviews")
      .update({
        rating,
        quote: quote.trim().slice(0, 1000),
        role: role.trim().slice(0, 100) || null,
        submitted_at: new Date().toISOString(),
      })
      .eq("token", token!)
      .eq("status", "pending");

    if (updateError) {
      setError("Failed to submit review. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="text-muted-foreground">Your review has been submitted. We really appreciate your feedback!</p>
        </div>
      </div>
    );
  }

  if (error && !review) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-foreground mb-1">Leave a Review</h1>
          <p className="text-muted-foreground mb-6">
            Hi {review?.customer_name}, how was your experience
            {businessName ? ` with ${businessName}` : ""}?
          </p>

          {/* Star Rating */}
          <div className="mb-6">
            <Label className="mb-2 block">Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mb-4">
            <Label htmlFor="quote" className="mb-2 block">Your Review</Label>
            <Textarea
              id="quote"
              placeholder="Tell us about your experience..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              maxLength={1000}
              rows={4}
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <Label htmlFor="role" className="mb-2 block">Your Title/Role (optional)</Label>
            <Input
              id="role"
              placeholder="e.g. Homeowner, Business Owner"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={100}
            />
          </div>

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          <Button onClick={handleSubmit} disabled={submitting} className="w-full" size="lg">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
