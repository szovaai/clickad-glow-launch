import logo from "@/assets/logo-clickad.png";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-[hsl(0_0%_100%/0.06)] bg-popover">
      <div className="container px-6 py-16">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="ClickAd Media" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              High-conversion websites and growth systems for service businesses.
              We build lead machines that turn visitors into booked appointments.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/home" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
              <li><Link to="/audit" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/audit" className="text-muted-foreground hover:text-foreground transition-colors">Free AI Audit</Link></li>
              <li><Link to="/loom-library" className="text-muted-foreground hover:text-foreground transition-colors">Audit Examples</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-5">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div className="py-8 border-t border-b border-[hsl(0_0%_100%/0.06)] mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8 premium-card">
            <div>
              <h3 className="font-heading font-bold text-lg mb-1">Ready to grow?</h3>
              <p className="text-sm text-muted-foreground">Get your free AI website audit and a custom growth plan.</p>
            </div>
            <Link to="/audit">
              <Button size="lg">
                Get Free AI Audit
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 ClickAd Media. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
