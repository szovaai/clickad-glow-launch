import logo from "@/assets/logo-clickad.png";
import { Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="ClickAd Media - Calgary Website Design" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm">
              Calgary-based website design agency for service businesses. 
              We build conversion machines that turn traffic into paying customers.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <a 
                href="tel:587-575-9416" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                587-575-9416
              </a>
              <a 
                href="mailto:szovajason@gmail.com" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                szovajason@gmail.com
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#work" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/audit" className="text-muted-foreground hover:text-primary transition-colors">Free Audit</a></li>
              <li><a href="/loom-library" className="text-muted-foreground hover:text-primary transition-colors">Audit Examples</a></li>
              <li><a href="#launch" className="text-muted-foreground hover:text-primary transition-colors">7-Day Launch</a></li>
              <li><a href="#custom" className="text-muted-foreground hover:text-primary transition-colors">Custom Build</a></li>
              <li><a href="#seo" className="text-muted-foreground hover:text-primary transition-colors">SEO & Performance</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 ClickAd Media. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
