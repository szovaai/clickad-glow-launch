import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, BarChart3, Search, Smartphone, Zap, Shield, Target, ArrowRight } from "lucide-react";
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
import { Star, Sparkles, Menu } from "lucide-react";
import logo from "@/assets/logo-clickad.png";

const services = [
  "Website (Design + Build)",
  "Funnel / Landing Page",
  "SEO & Content",
  "Local Lead Gen (GMB)",
  "Conversion Copywriting",
  "Branding / Style Guide",
  "Ongoing Care Plan",
];

export default function PremiumHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.12),transparent_55%)]" />
        <GridGlow />
        <Noise />
      </div>

      <TopNav />

      <section className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Calgary • Service Businesses • 7‑Day Launch
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
            >
              Conversion-Ready Websites for <span className="text-primary glow-text">Calgary's Hardest Working</span> Service Pros
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-5 max-w-xl text-balance text-foreground/70"
            >
              Conversion‑first design, blazingly fast performance, and a results dashboard you'll actually use. Built in 7 days, backed by a 90‑day improvement plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <QuoteCta asChild>
                <Button variant="glow" size="lg" className="h-12 gap-2 rounded-xl px-6 text-base">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </QuoteCta>
              <a
                href="#work"
                className="inline-flex h-12 items-center rounded-xl border border-border bg-card/50 px-5 text-sm text-foreground backdrop-blur transition hover:bg-card"
              >
                See real results
              </a>
              <div className="flex items-center gap-1 text-foreground/60">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-1 text-xs">5 local case studies • Serving Calgary service businesses</span>
              </div>
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

function TopNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-2 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ClickAd Media" className="h-10 w-auto" />
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {[
              ["Work", "#work"],
              ["Templates", "#templates"],
              ["Process", "#process"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
              ["About", "/about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop quote trigger */}
          <div className="hidden md:flex items-center gap-2">
            <QuoteCta>
              <Button variant="glow" className="h-10 rounded-xl px-4 text-sm">
                Get a Quote
              </Button>
            </QuoteCta>
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center gap-2">
            <QuoteCta asChild>
              <Button variant="glow" size="sm" className="rounded-xl">
                Quote
              </Button>
            </QuoteCta>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {[
                    ["Work", "#work"],
                    ["Templates", "#templates"],
                    ["Process", "#process"],
                    ["Pricing", "#pricing"],
                    ["FAQ", "#faq"],
                    ["About", "/about"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="text-base text-muted-foreground transition hover:text-foreground py-2"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuoteCta({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  return (
    <Sheet>
      <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto border-l border-border bg-background sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Request a Quote</SheetTitle>
          <SheetDescription>
            Tell us what you need. We'll reply within one business day.
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

      // 1. Create company record
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

      // 2. Create contact record
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

      // 3. Create audit record
      const { data: audit, error: auditError } = await supabase
        .from("audits")
        .insert({
          company_id: company.id,
          notes: `Budget: ${payload.budget}, Timeline: ${payload.timeline}, Services: ${selected.join(", ")}. Message: ${payload.message || ""}`,
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

      // 4. Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-audit-notification",
        {
          body: {
            companyName: company.name,
            contactName: payload.name as string,
            email: payload.email as string,
            phone: payload.phone as string,
            notes: `Budget: ${payload.budget}, Timeline: ${payload.timeline}, Services: ${selected.join(", ")}. ${payload.message || ""}`,
            auditId: audit.id,
          },
        }
      );

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      // 5. Track with Trakrly
      if (typeof window !== "undefined" && (window as any).trackQuoteSubmit) {
        (window as any).trackQuoteSubmit();
      }

      alert("Thanks! Your request was received. We'll reach out within 1 business day.");
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Budget</Label>
          <Select name="budget" defaultValue="5000-10000">
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<5000">Under $5k</SelectItem>
              <SelectItem value="5000-10000">$5k–$10k</SelectItem>
              <SelectItem value=">10000">$10k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Timeline</Label>
          <Select name="timeline" defaultValue="2-4w">
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP</SelectItem>
              <SelectItem value="2-4w">2–4 weeks</SelectItem>
              <SelectItem value="4-8w">4–8 weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea id="message" name="message" placeholder="A few sentences about goals, pages, inspiration…" className="mt-1 h-28" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-muted-foreground">By submitting, you agree to our Terms & Privacy.</p>
        <Button type="submit" variant="glow" className="rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Request"}
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
    // Track form view
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
      // Extract company name from full name (first word)
      const companyName = data.name.split(' ')[0] + "'s Business";
      
      // Create company record
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyName,
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // Create contact record
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

      // Get UTM params
      const utmParams = getUTMFromSession();

      // Create audit record with project details and budget in notes
      const notes = [
        data.projectDetails ? `Project: ${data.projectDetails}` : '',
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

      // Send notification email
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

      // Track conversion
      if (window.Trakrly) {
        window.Trakrly.click({
          event: 'hero_form_submitted',
          budget: data.budget,
          has_project_details: !!data.projectDetails,
        });
      }

      toast({
        title: "Request Received!",
        description: "We'll be in touch within 24 hours.",
      });

      // Redirect to thank you page
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
          Get a Custom Website That Pays for Itself in 90 Days
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          We'll design, write, and launch a conversion-focused site for your service business—free consultation included.
        </p>
        
        {/* 5-Star Rating */}
        <div className="flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Rated 5 Stars by Calgary Business Owners
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground">Name *</Label>
          <Input
            id="name"
            {...register("name")}
            onFocus={handleFormStart}
            disabled={isSubmitting}
            className="mt-1.5 bg-background/50 border-border"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            onFocus={handleFormStart}
            disabled={isSubmitting}
            className="mt-1.5 bg-background/50 border-border"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="projectDetails" className="text-foreground">Project Details</Label>
          <Textarea
            id="projectDetails"
            {...register("projectDetails")}
            onFocus={handleFormStart}
            disabled={isSubmitting}
            className="mt-1.5 bg-background/50 border-border min-h-[80px]"
            placeholder="Brief description of what you need..."
          />
          {errors.projectDetails && (
            <p className="text-sm text-destructive mt-1">{errors.projectDetails.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="budget" className="text-foreground">Budget Range *</Label>
          <Select
            onValueChange={(value) => setValue("budget", value)}
            disabled={isSubmitting}
            value={budget}
          >
            <SelectTrigger className="mt-1.5 bg-background/50 border-border">
              <SelectValue placeholder="Select your budget" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="$500-$1k">$500 - $1,000</SelectItem>
              <SelectItem value="$1k-$5k">$1,000 - $5,000</SelectItem>
              <SelectItem value="$5k+">$5,000+</SelectItem>
              <SelectItem value="Not sure yet">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-sm text-destructive mt-1">{errors.budget.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="glow"
          className="w-full group"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : (
            <>
              Get Your Free Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {/* Urgency Message */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span>We only take 3 new builds/month. Secure your spot today.</span>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          No spam. We respect your privacy.
        </p>
      </form>
    </motion.div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card/50 to-card/0 p-2 shadow-2xl shadow-primary/5">
      <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <TrendingUp className="h-16 w-16 text-primary/60" />
          </div>
          <div className="grid gap-3">
            <div className="h-24 rounded-xl bg-card/80 border border-border/50 p-4 flex flex-col justify-between">
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold text-primary">+320%</div>
            </div>
            <div className="h-24 rounded-xl bg-card/80 border border-border/50 p-4 flex flex-col justify-between">
              <div className="text-xs text-muted-foreground">Load Time</div>
              <div className="text-2xl font-bold text-foreground">0.8s</div>
            </div>
            <div className="h-24 rounded-xl bg-card/80 border border-border/50 p-4 flex flex-col justify-between">
              <div className="text-xs text-muted-foreground">Pages Built</div>
              <div className="text-2xl font-bold text-foreground">12+</div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: BarChart3, label: "Analytics" },
            { icon: Search, label: "SEO" },
            { icon: Smartphone, label: "Mobile" },
            { icon: Zap, label: "Speed" },
            { icon: Shield, label: "Security" },
            { icon: Target, label: "CRO" },
          ].map((item, i) => (
            <div key={i} className="h-14 rounded-lg bg-card/80 border border-border/50 flex flex-col items-center justify-center gap-1">
              <item.icon className="h-4 w-4 text-primary/70" />
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-border" />
    </div>
  );
}

function GridGlow() {
  return (
    <svg aria-hidden="true" className="absolute inset-x-0 top-[-10%] -z-10 h-[140%] w-full">
      <defs>
        <radialGradient id="g" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.25)" />
          <stop offset="60%" stopColor="hsl(var(--primary) / 0)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  );
}

function Noise() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background:radial-gradient(circle_at_1px_1px,hsl(var(--foreground))_1px,transparent_1px)] [background-size:18px_18px]"
    />
  );
}
