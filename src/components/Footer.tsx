import logo from "@/assets/logo-clickad.png";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="ClickAd Media - Calgary Website Design" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm">
              Calgary-based website design agency for service businesses. 
              We build conversion machines that turn traffic into paying customers.
            </p>
            <div className="flex flex-col gap-2 mt-4">
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
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/home" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li>
                <a 
                  href="#process" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Our Process
                </a>
              </li>
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/audit" className="text-muted-foreground hover:text-primary transition-colors">Free Audit</Link></li>
              <li><Link to="/loom-library" className="text-muted-foreground hover:text-primary transition-colors">Audit Examples</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li>
                <a 
                  href="#included" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('included'); }}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  What's Included
                </a>
              </li>
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
        
        {/* CTA Section */}
        <div className="pt-8 border-t border-primary/10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-2">Ready to Transform Your Website?</h3>
              <p className="text-muted-foreground">Get your free audit and see how we can help you grow.</p>
            </div>
            <Link to="/audit">
              <Button size="lg" className="shadow-lg shadow-primary/20">
                Get Free Audit
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 ClickAd Media. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
