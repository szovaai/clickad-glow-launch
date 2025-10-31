import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
                  <p className="text-lg text-muted-foreground">ClickAdMedia.co (Freelance, Remote)</p>
                  <p className="text-sm text-muted-foreground">2023 – Present</p>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Lead cross-functional teams to ship enterprise-grade websites for SaaS, agency, and technical-services brands. Own the lifecycle across discovery, requirements, UX/UI, development, QA, and launch while managing scope, budget, and risks.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Translate goals and technical requirements into tickets, milestones, and timelines (ClickUp/Trello/Slack)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Coordinate devs/designers/SEO; run standups, sprint reviews, stakeholder demos, and UAT</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Implement analytics (GTM/GA4), dashboards, and post-launch growth plans (SEO/CRO/content)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Build AI-accelerated microsites and workflows with Lovable.dev + Supabase; reduce time-to-launch</span>
                  </li>
                </ul>
              </div>

              {/* Experience 2 */}
              <div className="mb-12 border-l-2 border-muted-foreground/30 pl-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">QA Software Analyst</h3>
                  <p className="text-lg text-muted-foreground">MediaJel (Remote)</p>
                  <p className="text-sm text-muted-foreground">2021 – 2023</p>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Owned manual QA and bug analysis across multiple web apps and marketing tools; collaborated with engineers and product to raise product quality and ship reliably.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Investigated and reproduced defects with clear steps to reproduce, logs, and visual evidence (screenshots/HAR)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Assessed severity/priority; triaged in Jira; partnered with engineering on root-cause analysis and verification of fixes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Designed and executed regression suites; maintained smoke tests for each release</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Performed cross-browser/device testing (Chrome, Firefox, Safari, Edge; iOS/Android) and validated analytics events (GTM/GA4)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Conducted API testing with Postman; used basic SQL for data validation across environments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Collaborated with Product on acceptance criteria and suggested UX/feature improvements informed by QA findings</span>
                  </li>
                </ul>
              </div>

              {/* Experience 3 */}
              <div className="mb-12 border-l-2 border-muted-foreground/30 pl-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">Website Project Lead / Digital Strategy Consultant</h3>
                  <p className="text-lg text-muted-foreground">SiteFoundry Pro / ClickAd Media</p>
                  <p className="text-sm text-muted-foreground">2025</p>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Managed multi-site programs for construction, manufacturing, and local services. Ran discovery, aligned stakeholders, and launched CMS/eCommerce builds tied to business KPIs.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Implemented WordPress/Webflow & WooCommerce/Shopify with CRM/email integrations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Directed QA, UAT, and handoff; established SOPs/maintenance plans to convert launches into retainers</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Led SEO foundations (site architecture, internal linking, technical hygiene) and CRO tests</span>
                  </li>
                </ul>
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
                "ChatGPT",
                "Make",
                "N8N",
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
