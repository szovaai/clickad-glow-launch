import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle, Loader2, ExternalLink, MessageSquare } from "lucide-react";
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
  const [googleReviewUrl, setGoogleReviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [role, setRole] = useState("");

  // Step: "rate" -> "feedback" (1-3 stars) or "redirect" (4-5 stars)
  const [step, setStep] = useState<"rate" | "feedback" | "redirect">("rate");

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

    // Get business name and Google review URL
    const { data: client } = await supabase
      .from("client_accounts")
      .select("business_name, google_review_url")
      .eq("id", data.client_account_id)
      .single();

    setBusinessName(client?.business_name || "");
    setGoogleReviewUrl((client as any)?.google_review_url || null);
    setLoading(false);
  }

  function handleRatingSelect(star: number) {
    setRating(star);
  }

  async function handleRatingContinue() {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setError("");

    if (rating >= 4 && googleReviewUrl) {
      // Save the rating first, then redirect
      setRedirecting(true);
      await supabase
        .from("reviews")
        .update({
          rating,
          quote: "Redirected to Google",
          submitted_at: new Date().toISOString(),
        })
        .eq("token", token!)
        .eq("status", "pending");

      setStep("redirect");
      // Auto-redirect after a short delay
      setTimeout(() => {
        window.open(googleReviewUrl, "_blank");
      }, 1500);
    } else {
      // Low rating or no Google URL — collect private feedback
      setStep("feedback");
    }
  }

  async function handleSubmitFeedback() {
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

  // Thank you screen for private feedback
  if (submitted && step !== "redirect") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="text-muted-foreground">Your feedback has been submitted. We really appreciate you taking the time!</p>
        </div>
      </div>
    );
  }

  // Google redirect screen (4-5 stars)
  if (step === "redirect") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-8 w-8 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">We're Glad You Had a Great Experience!</h1>
          <p className="text-muted-foreground mb-6">
            Would you mind sharing your experience on Google? It helps others find {businessName || "us"} and means a lot to our team.
          </p>
          <Button size="lg" className="gap-2" onClick={() => window.open(googleReviewUrl!, "_blank")}>
            <ExternalLink className="h-4 w-4" />
            Leave a Google Review
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Opening Google Reviews...</p>
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
          {step === "rate" && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">How Was Your Experience?</h1>
              <p className="text-muted-foreground mb-6">
                Hi {review?.customer_name}, please rate your experience
                {businessName ? ` with ${businessName}` : ""}.
              </p>

              {/* Star Rating */}
              <div className="mb-6 flex justify-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingSelect(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`h-10 w-10 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {rating > 0 && (
                <p className="text-center text-sm text-muted-foreground mb-4">
                  {rating >= 4 ? "Awesome! We're glad to hear that! 🎉" : "We appreciate your honest feedback."}
                </p>
              )}

              {error && <p className="text-sm text-destructive mb-4 text-center">{error}</p>}

              <Button onClick={handleRatingContinue} disabled={rating === 0} className="w-full" size="lg">
                Continue
              </Button>
            </>
          )}

          {step === "feedback" && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Share Your Feedback</h1>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                We're sorry to hear about your experience. Your feedback helps us improve.
              </p>

              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-5 w-5 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                ))}
              </div>

              <div className="mb-4">
                <Label htmlFor="quote" className="mb-2 block">What could we do better?</Label>
                <Textarea
                  id="quote"
                  placeholder="Tell us what happened and how we can improve..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  maxLength={1000}
                  rows={4}
                />
              </div>

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

              <Button onClick={handleSubmitFeedback} disabled={submitting} className="w-full" size="lg">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Submit Feedback
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
