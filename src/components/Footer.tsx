import logo from "@/assets/logo-clickad.png";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="ClickAd Media" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered websites and growth systems for service businesses. 
              We build lead machines that turn visitors into booked appointments — automatically.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/home" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Free AI Audit</Link></li>
              <li><Link to="/loom-library" className="text-muted-foreground hover:text-primary transition-colors">Audit Examples</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-2">Ready to Turn Your Website Into a Growth Engine?</h3>
              <p className="text-muted-foreground">Get your free AI website audit and see how we can help you grow.</p>
            </div>
            <Link to="/audit">
              <Button size="lg" className="shadow-lg shadow-primary/20">
                Get Free AI Audit
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 ClickAd Media. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
