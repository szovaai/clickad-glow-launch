import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-clickad.png";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/10">
      <div className="container px-6 h-26 md:h-28 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ClickAd Media" className="h-21 md:h-24 w-auto" />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </a>
          <a href="#work" className="text-sm font-medium hover:text-primary transition-colors">
            Work
          </a>
          <a href="#process" className="text-sm font-medium hover:text-primary transition-colors">
            Process
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
        </nav>
        
        <Button variant="glow" size="sm">
          Get Started
        </Button>
      </div>
    </header>
  );
};
