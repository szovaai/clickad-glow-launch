import logo from "@/assets/logo-clickad.png";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="ClickAd Media" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm">
              We build conversion machines that turn traffic into paying clients. 
              Big-agency quality without the agency fluff.
            </p>
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
            <h3 className="font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#launch" className="text-muted-foreground hover:text-primary transition-colors">7-Day Launch</a></li>
              <li><a href="#custom" className="text-muted-foreground hover:text-primary transition-colors">Custom Build</a></li>
              <li><a href="#seo" className="text-muted-foreground hover:text-primary transition-colors">SEO & Performance</a></li>
              <li><a href="#support" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
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
