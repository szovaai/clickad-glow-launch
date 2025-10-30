import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ArrowRight, Star, Sparkles, Menu } from "lucide-react";
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

      <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 md:pt-40">
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
              Websites that <span className="text-primary glow-text">work as hard</span> as you do.
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
                <span className="ml-1 text-xs">18+ local case studies</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <HeroShowcase />
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
            <img src={logo} alt="ClickAd Media" className="h-8 w-auto" />
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

function QuoteCta({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
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

  function toggleService(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    // TODO: Connect to backend (Supabase/Resend/Make.com)
    console.log("Quote payload", { ...payload, services: selected });
    
    // Success feedback
    alert("Thanks! Your request was received. We'll reach out within 1 business day.");
    
    // Reset form
    e.currentTarget.reset();
    setSelected([]);
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
        <Button type="submit" variant="glow" className="rounded-xl">Send Request</Button>
      </div>
    </form>
  );
}

function HeroShowcase() {
  return (
    <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card/50 to-card/0 p-2 shadow-2xl shadow-primary/5">
      <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/30 to-primary/10" />
          <div className="grid gap-3">
            <div className="h-24 rounded-xl bg-card/80" />
            <div className="h-24 rounded-xl bg-card/80" />
            <div className="h-24 rounded-xl bg-card/80" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-card/80" />
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
