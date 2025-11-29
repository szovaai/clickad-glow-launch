import logo from "@/assets/logo-clickad.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-12 gap-8 mb-8">
          {/* Brand + Contact */}
          <div className="md:col-span-3 space-y-4">
            <img src={logo} alt="ClickAd Media - Calgary Website Design" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              Calgary-based website design agency for service businesses. 
              We build conversion machines that turn traffic into paying customers.
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:szovajason@gmail.com" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                szovajason@gmail.com
              </a>
              <a 
                href="tel:+14038752231" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                (403) 875-2231
              </a>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Calgary, Alberta
              </div>
            </div>
          </div>

          {/* Mini CTA */}
          <div className="md:col-span-3">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
              <p className="font-heading font-semibold">Ready to grow your business?</p>
              <p className="text-sm text-muted-foreground">Get a free 5-minute website audit and discover how to get more customers.</p>
              <Button variant="glow" size="sm" asChild className="w-full">
                <Link to="/audit">Get Your Free Audit</Link>
              </Button>
            </div>
          </div>
          
          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/home#work" className="text-muted-foreground hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link to="/home#process" className="text-muted-foreground hover:text-primary transition-colors">Our Process</Link></li>
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/calgary-website-design" className="text-muted-foreground hover:text-primary transition-colors">Website Design</Link></li>
              <li><Link to="/services/calgary-electrician-websites" className="text-muted-foreground hover:text-primary transition-colors">Electrician Websites</Link></li>
              <li><Link to="/services/calgary-renovation-contractor-websites" className="text-muted-foreground hover:text-primary transition-colors">Renovation Websites</Link></li>
              <li><Link to="/services/calgary-industrial-manufacturing-websites" className="text-muted-foreground hover:text-primary transition-colors">Industrial Websites</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Free Audit</Link></li>
              <li><Link to="/loom-library" className="text-muted-foreground hover:text-primary transition-colors">Audit Examples</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/home#services" className="text-muted-foreground hover:text-primary transition-colors">All Services</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 ClickAd Media. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/legal#privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/legal#terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
