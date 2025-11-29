import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

export default function Legal() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy & Terms of Service | ClickAd Media</title>
        <meta name="description" content="Privacy Policy and Terms of Service for ClickAd Media Calgary website design services." />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container px-6 py-24 max-w-4xl">
          {/* Privacy Policy Section */}
          <section id="privacy" className="mb-16 scroll-mt-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  When you request a free audit or contact us through our website, we collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Your name and contact information (email, phone number)</li>
                  <li>Your company name and website URL</li>
                  <li>Industry and business information you provide</li>
                  <li>Communication preferences and history</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide you with a free website audit and recommendations</li>
                  <li>Communicate about our services and respond to your inquiries</li>
                  <li>Improve our services and website experience</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                  <li>Service providers who assist in our business operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* Terms of Service Section */}
          <section id="terms" className="scroll-mt-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using ClickAd Media's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Services</h2>
                <p className="text-muted-foreground mb-4">
                  ClickAd Media provides website design, development, and digital marketing services for service businesses in Calgary and surrounding areas. Our services include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Custom website design and development</li>
                  <li>Search engine optimization (SEO)</li>
                  <li>Website audits and consultations</li>
                  <li>Ongoing website maintenance and support</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Free Audit</h2>
                <p className="text-muted-foreground">
                  Our free 5-minute website audit is provided as-is for informational purposes. While we strive for accuracy, we make no guarantees about the completeness or reliability of the audit findings. The audit does not constitute professional advice and should not be relied upon as the sole basis for business decisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Client Responsibilities</h2>
                <p className="text-muted-foreground mb-4">When engaging our services, clients agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Respond to requests for feedback in a timely manner</li>
                  <li>Provide necessary content, images, and brand materials</li>
                  <li>Make timely payments according to agreed terms</li>
                  <li>Maintain ownership rights to any provided content</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  Upon full payment for website design services, clients receive ownership of the final website design and code. ClickAd Media retains the right to showcase completed projects in our portfolio and marketing materials unless otherwise agreed in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  ClickAd Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Refunds and Cancellations</h2>
                <p className="text-muted-foreground">
                  Refund and cancellation policies are specified in individual service agreements. Free audits and consultations do not constitute a binding agreement for paid services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms of Service shall be governed by and construed in accordance with the laws of Alberta, Canada, without regard to its conflict of law provisions.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-2xl font-heading font-semibold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our Privacy Policy or Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: <a href="mailto:szovajason@gmail.com" className="text-primary hover:underline">szovajason@gmail.com</a></p>
              <p>Phone: <a href="tel:+14038752231" className="text-primary hover:underline">(403) 875-2231</a></p>
              <p>Location: Calgary, Alberta</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}