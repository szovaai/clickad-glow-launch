import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Phone, Bot, MessageSquare, CalendarCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroLeadFormSchema, type HeroLeadFormData } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { getUTMFromSession } from "@/lib/utm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Star, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const services = [
  "AI Receptionist (Voice)",
  "Smart Chat Qualifier",
  "Missed-Call Text Back",
  "Follow-Up Automation",
  "Review Collection",
  "Lead Reactivation",
  "CRM + Pipeline Setup",
];

export default function PremiumHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.12),transparent_55%)]" />
        <GridGlow />
        <Noise />
      </div>

      <Navigation />

      <section className="relative mx-auto max-w-6xl px-4 pt-8 md:pt-8 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Sales Infrastructure for Service Businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
            >
              Turn Missed Calls Into{" "}
              <span className="text-primary glow-text">Booked Jobs</span>
              —Automatically
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-5 max-w-xl text-balance text-lg text-foreground/70"
            >
              We install an AI Sales System that answers calls, qualifies leads, and books appointments 24/7—so you never lose another customer to a missed call.
            </motion.p>

            {/* Stat Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {[
                { icon: Phone, label: "AI answers in <2 rings" },
                { icon: MessageSquare, label: "Texts back missed calls" },
                { icon: CalendarCheck, label: "Books 24/7 on autopilot" },
              ].map((stat, i) => (
                <div key={i} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm backdrop-blur">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-foreground/80">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <QuoteCta asChild>
                <Button variant="glow" size="lg" className="h-12 gap-2 rounded-xl px-6 text-base">
                  Book a 10-Min Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </QuoteCta>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex h-12 items-center rounded-xl border border-border bg-card/50 px-5 text-sm text-foreground backdrop-blur transition hover:bg-card cursor-pointer"
              >
                See how it works
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 flex items-center gap-1 text-foreground/60"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="ml-1 text-xs">Trusted by Calgary trades & service businesses</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <HeroLeadForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}


export function QuoteCta({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  return (
    <Sheet>
      <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto border-l border-border bg-background sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Book Your AI Sales Demo</SheetTitle>
          <SheetDescription>
            Tell us about your business. We'll show you exactly how AI can answer and book for you.
          </SheetDescription>
        </SheetHeader>
        <QuoteForm />
      </SheetContent>
    </Sheet>
  );
}

function QuoteForm() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function toggleService(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { getUTMFromSession } = await import("@/lib/utm");

      const utmParams = getUTMFromSession();

      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: payload.company as string || "Unknown Company",
          city: "Calgary",
          province: "AB",
        })
        .select()
        .single();

      if (companyError) throw companyError;

      const nameParts = (payload.name as string).split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || null;

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert({
          company_id: company.id,
          first_name: firstName,
          last_name: lastName,
          email: payload.email as string,
          phone: payload.phone as string || null,
        })
        .select()
        .single();

      if (contactError) throw contactError;

      const { data: audit, error: auditError } = await supabase
        .from("audits")
        .insert({
          company_id: company.id,
          notes: `Monthly calls: ${payload.monthly_calls}, Services needed: ${selected.join(", ")}. Message: ${payload.message || ""}`,
          status: "new",
          utm_source: utmParams.utm_source || null,
          utm_medium: utmParams.utm_medium || null,
          utm_campaign: utmParams.utm_campaign || null,
          utm_term: utmParams.utm_term || null,
          utm_content: utmParams.utm_content || null,
        })
        .select()
        .single();

      if (auditError) throw auditError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-audit-notification",
        {
          body: {
            companyName: company.name,
            contactName: payload.name as string,
            email: payload.email as string,
            phone: payload.phone as string,
            notes: `Monthly calls: ${payload.monthly_calls}, Services: ${selected.join(", ")}. ${payload.message || ""}`,
            auditId: audit.id,
          },
        }
      );

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      if (typeof window !== "undefined" && (window as any).trackQuoteSubmit) {
        (window as any).trackQuoteSubmit();
      }

      alert("Thanks! We'll reach out within 24 hours with your custom AI plan.");
      e.currentTarget.reset();
      setSelected([]);
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("There was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required placeholder="Jane Smith" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Acme Electrical" className="mt-1" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required placeholder="you@company.com" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="(555) 555‑5555" className="mt-1" />
        </div>
      </div>

      <div>
        <Label>How many calls/leads per month?</Label>
        <Select name="monthly_calls" defaultValue="20-50">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<20">Under 20</SelectItem>
            <SelectItem value="20-50">20–50</SelectItem>
            <SelectItem value="50-100">50–100</SelectItem>
            <SelectItem value=">100">100+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>What do you need?</Label>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s} className={cn(
              "group flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm cursor-pointer transition-all",
              selected.includes(s) && "border-primary/40 bg-primary/10 ring-1 ring-primary/20"
            )}>
              <Checkbox
                checked={selected.includes(s)}
                onCheckedChange={() => toggleService(s)}
              />
              <span className="leading-tight">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Anything else?</Label>
        <Textarea id="message" name="message" placeholder="Tell us about your biggest challenge with leads..." className="mt-1 h-28" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-muted-foreground">No spam. No pressure. Real answers.</p>
        <Button type="submit" variant="glow" className="rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Get My AI Plan"}
        </Button>
      </div>
    </form>
  );
}

function HeroLeadForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HeroLeadFormData>({
    resolver: zodResolver(heroLeadFormSchema),
  });

  const budget = watch("budget");

  React.useEffect(() => {
    if (window.Trakrly) {
      window.Trakrly.click({ event: 'hero_form_view' });
    }
  }, []);

  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      if (window.Trakrly) {
        window.Trakrly.click({ event: 'hero_form_start' });
      }
    }
  };

  const onSubmit = async (data: HeroLeadFormData) => {
    setIsSubmitting(true);
    
    try {
      const companyName = data.name.split(' ')[0] + "'s Business";
      
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();

      if (companyError) throw companyError;

      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .insert({
          first_name: data.name,
          email: data.email,
          company_id: company.id,
        })
        .select()
        .single();

      if (contactError) throw contactError;

      const utmParams = getUTMFromSession();

      const notes = [
        data.projectDetails ? `Biggest challenge: ${data.projectDetails}` : '',
        `Budget: ${data.budget}`,
      ].filter(Boolean).join('\n');

      const { data: audit, error: auditError } = await supabase
        .from('audits')
        .insert({
          company_id: company.id,
          notes: notes,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_term: utmParams.utm_term,
          utm_content: utmParams.utm_content,
        })
        .select()
        .single();

      if (auditError) throw auditError;

      const { error: emailError } = await supabase.functions.invoke('send-audit-notification', {
        body: {
          companyName: company.name,
          contactName: data.name,
          email: data.email,
          phone: '',
          website: '',
          industry: '',
          notes: notes,
        },
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
      }

      if (window.Trakrly) {
        window.Trakrly.click({
          event: 'hero_form_submitted',
          budget: data.budget,
          has_project_details: !!data.projectDetails,
        });
      }

      toast({
        title: "Request Received!",
        description: "We'll send your custom AI plan within 24 hours.",
      });

      setTimeout(() => {
        navigate('/thank-you');
      }, 1000);

    } catch (error: any) {
      console.error('Form submission error:', error);
      
      if (window.Trakrly) {
        window.Trakrly.click({
          event: 'hero_form_error',
          error: error.message,
        });
      }

      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly at jason@clickad.media",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="glass rounded-2xl p-8 border border-primary/20 shadow-premium"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-3 glow-text">
          Get Your Custom AI Sales Plan
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          See exactly how AI can answer, qualify, and book for your business—free consultation included.
        </p>
        
        {/* Social Proof */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Bot className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-xs text-foreground/70">
            <span className="font-semibold text-primary">AI never sleeps.</span> Your system answers calls, texts, and chats 24/7/365.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" onFocus={handleFormStart}>
        <div>
          <Label htmlFor="hero-name" className="text-sm font-medium">Your Name *</Label>
          <Input
            id="hero-name"
            {...register("name")}
            placeholder="Jane Smith"
            className="mt-1.5"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="hero-email" className="text-sm font-medium">Email *</Label>
          <Input
            id="hero-email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className="mt-1.5"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="hero-details" className="text-sm font-medium">What's your biggest lead challenge? (optional)</Label>
          <Input
            id="hero-details"
            {...register("projectDetails")}
            placeholder="e.g. Missing calls after hours"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Monthly investment range *</Label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {[
              { value: "<1500", label: "Under $1.5k" },
              { value: "1500-3000", label: "$1.5k–$3k" },
              { value: ">3000", label: "$3k+" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue("budget", option.value, { shouldValidate: true })}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  budget === option.value
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "border-border bg-card/50 text-foreground/70 hover:border-primary/30"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.budget && <p className="text-xs text-destructive mt-1">{errors.budget.message}</p>}
        </div>

        <Button
          type="submit"
          variant="glow"
          size="lg"
          className="w-full text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Get My AI Sales Plan →"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Free consultation • No obligation • Response within 24h
        </p>
      </form>
    </motion.div>
  );
}

/* ── decorative helpers ── */
function GridGlow() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Noise() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}
