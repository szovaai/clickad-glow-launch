import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Jason Szova
              </h1>
              <p className="mb-6 text-xl text-muted-foreground sm:text-2xl">
                Senior Website Project & Account Manager
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Calgary, Canada • Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:587-575-9416" className="hover:text-primary transition-colors">
                    587-575-9416
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:szovajason@gmail.com" className="hover:text-primary transition-colors">
                    szovajason@gmail.com
                  </a>
                </div>
              </div>

              <Button variant="glow" size="lg" asChild>
                <a href="/Jason_Szova_Resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume PDF
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold">Professional Summary</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Client-first Website Account & Project Manager with 7+ years leading complex, multi-stakeholder web projects from discovery through launch. Bridges strategy, design, and engineering to deliver on-time, on-budget launches that convert. Fluent in WordPress/Webflow/Shopify, GA4/GTM, and SEO/CRO best practices; comfortable translating technical requirements into clear roadmaps and sprint plans. Experienced in AI-assisted site generation and workflow automation using Lovable.dev, Make, and Supabase to accelerate delivery and reduce scope creep.
              </p>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold">Core Competencies</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Enterprise Website Project Management",
                  "Client Communication & Account Growth",
                  "Scope/Budget/Timeline Management",
                  "SEO, CRO & Analytics (GA4, GTM)",
                  "Reporting & Insights",
                  "Technical Requirements Gathering",
                  "Prioritization & Risk Management",
                  "Vendor Coordination",
                  "AI-Driven Workflows & Automation",
                  "Email & Funnel Strategy",
                  "CMS & eCommerce Platforms",
                  "WordPress, Webflow, Shopify",
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-background p-4 text-sm font-medium transition-colors hover:border-primary/50"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-3xl font-bold">Professional Experience</h2>
              
              {/* Experience 1 */}
              <div className="mb-12 border-l-2 border-primary pl-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">Senior Website Account & Project Manager</h3>
                  <p className="text-lg text-muted-foreground">Rev Elate Digital / Freelance (Remote)</p>
                  <p className="text-sm text-muted-foreground">2020 – Present</p>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Lead cross-functional teams shipping enterprise-grade websites for SaaS, agency, and technical-service brands. Own end-to-end lifecycle across discovery, requirements, UX/UI, development, QA, and launch while managing scope, budget, and risks.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Gather goals and technical requirements; convert into actionable tickets and timelines (Trello, Slack)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Coordinate developers, designers, and SEO specialists; run standups, reviews, and stakeholder demos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Implement analytics & tracking (GTM/GA4), dashboards, and post-launch growth plans (SEO/CRO/Content)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Build AI-accelerated workflows and client microsite prototypes using Lovable.dev</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Maintained 100% on-time delivery across 12+ large builds while increasing retention and upsells</span>
                  </li>
                </ul>
              </div>

              {/* Experience 2 */}
              <div className="mb-12 border-l-2 border-muted-foreground/30 pl-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">Website Project Lead / Digital Strategy Consultant</h3>
                  <p className="text-lg text-muted-foreground">ClickAd Media / SiteFoundry Pro</p>
                  <p className="text-sm text-muted-foreground">2016 – 2020</p>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Managed multi-site programs for construction, manufacturing, and local services. Ran discovery and requirements, aligned stakeholders, and launched CMS and eCommerce builds that moved key metrics.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Implemented WordPress/Webflow & WooCommerce/Shopify builds with CRM/email integrations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Directed QA, UAT, and handoff; set up SOPs and maintenance plans</span>
                  </li>
                </ul>
              </div>

              {/* Featured Project */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Featured Enterprise Project
                </h3>
                <h4 className="mb-2 font-semibold">SiteFoundry Pro (Enterprise CMS & Lead Gen Platform)</h4>
                <p className="text-muted-foreground">
                  Project lead across discovery → launch; coordinated design, development, and SEO teams; integrated GA4/GTM, CRM, and performance reporting. Result: accelerated builds and smoother handoffs; created a repeatable framework for future multi-site deployments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold">Education & Certifications</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold">Google Analytics 4 Certified</h3>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold">Project Management for Digital Agencies</h3>
                  <p className="text-sm text-muted-foreground">Coursera</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold">AI for Marketing & UX Systems</h3>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Platforms */}
        <section className="py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold">Tools & Platforms</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[
                  "Trello",
                  "Slack",
                  "ClickUp",
                  "Notion",
                  "Google Tag Manager",
                  "GA4",
                  "Search Console",
                  "SEMrush",
                  "WordPress",
                  "Webflow",
                  "Shopify",
                  "WooCommerce",
                  "Supabase",
                  "Lovable.dev",
                  "Make",
                  "Zapier",
                  "Canva",
                  "Systeme.io",
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card p-3 text-center text-sm font-medium transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Let's Work Together</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Ready to deliver exceptional web experiences? Let's discuss how I can help drive your next project.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="glow" size="lg" asChild>
                  <a href="mailto:szovajason@gmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Get in Touch
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/Jason_Szova_Resume.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
