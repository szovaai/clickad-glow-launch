import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8 md:pt-12">
        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-heading font-bold glow-text">
                  Terms of Service
                </h1>
                <p className="text-xl text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Acceptance of Terms</h2>
                  <p className="text-foreground/80">
                    By accessing and using ClickAd Media's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Description of Services</h2>
                  <p className="text-foreground/80">
                    ClickAd Media provides web design, development, and digital marketing services for service-based businesses. Our services include but are not limited to website design and development, SEO optimization, conversion optimization, and digital strategy consulting.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">User Obligations</h2>
                  <p className="text-foreground/80 mb-4">
                    You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Provide accurate and complete information when requested</li>
                    <li>Maintain the confidentiality of any account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not interfere with or disrupt our services or servers</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Intellectual Property</h2>
                  <p className="text-foreground/80">
                    All content on this website, including text, graphics, logos, images, and software, is the property of ClickAd Media or its content suppliers and is protected by intellectual property laws. Upon full payment for services, you will own the website and content we create for you, unless otherwise specified in a separate agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Payment Terms</h2>
                  <p className="text-foreground/80">
                    Payment terms will be specified in individual service agreements. Generally, a deposit is required before work begins, with the balance due upon project completion. Late payments may incur additional fees. We reserve the right to suspend or terminate services for non-payment.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Project Timeline and Deliverables</h2>
                  <p className="text-foreground/80">
                    We will provide estimated timelines for project completion. While we strive to meet all deadlines, timelines are estimates and may be affected by factors such as client feedback delays, scope changes, or technical complications. Specific deliverables and timelines will be outlined in individual project agreements.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Revisions and Changes</h2>
                  <p className="text-foreground/80">
                    Our service agreements typically include a specified number of revision rounds. Additional revisions beyond the agreed-upon scope may incur extra charges. Significant changes to project scope may require a new agreement and additional fees.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Warranty and Guarantees</h2>
                  <p className="text-foreground/80">
                    We warrant that our services will be performed in a professional manner. We guarantee our work will be free from defects in workmanship for a specified period after project completion (typically 30 days). This does not cover issues arising from client modifications, third-party software updates, or factors outside our control.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Limitation of Liability</h2>
                  <p className="text-foreground/80">
                    To the maximum extent permitted by law, ClickAd Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Termination</h2>
                  <p className="text-foreground/80">
                    Either party may terminate a service agreement with written notice. Upon termination, you will be responsible for payment for all work completed up to the termination date. We reserve the right to terminate services immediately for breach of these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Governing Law</h2>
                  <p className="text-foreground/80">
                    These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ClickAd Media operates, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Changes to Terms</h2>
                  <p className="text-foreground/80">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Contact Information</h2>
                  <p className="text-foreground/80">
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="text-primary mt-4">
                    <a href="mailto:jason@clickad.media" className="hover:underline">
                      jason@clickad.media
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
