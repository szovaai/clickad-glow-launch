import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuditScoreCard, type AuditResult } from "@/components/audit/AuditScoreCard";
import { AuditPdfReport } from "@/components/audit/AuditPdfReport";
import { toast } from "sonner";
import { Loader2, Download, RotateCcw, Search } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const industries = [
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "hvac", label: "HVAC" },
  { value: "renovation", label: "Renovation / Contractor" },
  { value: "roofing", label: "Roofing" },
  { value: "landscaping", label: "Landscaping" },
  { value: "cleaning", label: "Cleaning Services" },
  { value: "pest-control", label: "Pest Control" },
  { value: "painting", label: "Painting" },
  { value: "other", label: "Other Trade" },
];

const loadingSteps = [
  "Connecting to website...",
  "Scanning page content...",
  "Analyzing mobile responsiveness...",
  "Checking local SEO signals...",
  "Evaluating contact options...",
  "Reviewing site speed indicators...",
  "Assessing booking capabilities...",
  "Generating your report...",
];

const AiAudit = () => {
  const [businessName, setBusinessName] = useState("");
  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const runAudit = async () => {
    if (!url.trim()) {
      toast.error("Please enter a website URL");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Animate loading steps
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const { data, error } = await supabase.functions.invoke("run-ai-audit", {
        body: { url: url.trim(), businessName: businessName.trim(), industry },
      });

      clearInterval(interval);

      if (error) {
        console.error("Edge function error:", error);
        toast.error("Failed to run audit. Please try again.");
        return;
      }

      if (!data?.success) {
        toast.error(data?.error || "Audit failed. The website may be unreachable.");
        return;
      }

      setResult(data.data);
      toast.success("Audit complete!");
    } catch (err) {
      clearInterval(interval);
      console.error("Audit error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!pdfRef.current || !result) return;

    toast.info("Generating PDF...");

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f14",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, canvas.height * (794 / canvas.width)] });
      pdf.addImage(imgData, "PNG", 0, 0, 794, canvas.height * (794 / canvas.width));
      pdf.save(`${result.businessName.replace(/[^a-zA-Z0-9]/g, "-")}-website-audit.pdf`);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("PDF error:", err);
      toast.error("Failed to generate PDF");
    }
  };

  const reset = () => {
    setResult(null);
    setBusinessName("");
    setUrl("");
    setIndustry("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Search className="w-4 h-4" />
              AI-Powered Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              Free AI Website Audit
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get an instant, AI-powered analysis of your website. We'll score it on 8 critical areas and show you exactly what to fix.
            </p>
          </div>

          {!result ? (
            <>
              {/* Form */}
              <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Business Name</label>
                    <Input
                      placeholder="e.g. Smith Electric"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Website URL *</label>
                    <Input
                      placeholder="e.g. smithelectric.ca"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Industry</label>
                    <Select value={industry} onValueChange={setIndustry} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>
                            {ind.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={runAudit}
                    disabled={isLoading || !url.trim()}
                    className="w-full"
                    size="lg"
                    variant="glow"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Run Free Audit
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Loading Animation */}
              {isLoading && (
                <div className="max-w-lg mx-auto mt-8 space-y-3">
                  {loadingSteps.map((step, i) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                        i < loadingStep
                          ? "text-emerald-400"
                          : i === loadingStep
                          ? "text-foreground"
                          : "text-muted-foreground/40"
                      }`}
                    >
                      {i < loadingStep ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">✓</span>
                      ) : i === loadingStep ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-muted-foreground/20" />
                      )}
                      {step}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <Button onClick={downloadPdf} variant="glow" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Report
                </Button>
                <Button onClick={reset} variant="outline" size="lg">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Scan Another Site
                </Button>
              </div>

              {/* Scorecard */}
              <AuditScoreCard result={result} />

              {/* CTA */}
              <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Want Us to Fix These Issues?</h3>
                <p className="text-muted-foreground mb-4">
                  Book a free strategy call and we'll build you an AI-powered website that actually converts.
                </p>
                <Button variant="glow" size="lg" asChild>
                  <a href="/audit">Book Strategy Call</a>
                </Button>
              </div>

              {/* Hidden PDF layout */}
              <AuditPdfReport ref={pdfRef} result={result} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiAudit;
