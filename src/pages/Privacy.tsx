import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8 md:pt-12">
        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-heading font-bold glow-text">
                  Privacy Policy
                </h1>
                <p className="text-xl text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Introduction</h2>
                  <p className="text-foreground/80">
                    At ClickAd Media, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Information We Collect</h2>
                  <p className="text-foreground/80 mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company name and website URL</li>
                    <li>Information about your business and industry</li>
                    <li>Messages and communications with our team</li>
                    <li>Technical data such as IP address, browser type, and device information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">How We Use Your Information</h2>
                  <p className="text-foreground/80 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Communicate with you about our services</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Analyze website usage and optimize user experience</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Data Sharing and Disclosure</h2>
                  <p className="text-foreground/80">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
                    <li>Service providers who assist in our operations</li>
                    <li>Professional advisors (lawyers, accountants, etc.)</li>
                    <li>Law enforcement or regulatory bodies when required by law</li>
                    <li>Third parties with your explicit consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Cookies and Tracking Technologies</h2>
                  <p className="text-foreground/80">
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Data Security</h2>
                  <p className="text-foreground/80">
                    We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Your Rights</h2>
                  <p className="text-foreground/80 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-foreground/80">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-heading font-bold mb-4">Contact Us</h2>
                  <p className="text-foreground/80">
                    If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
