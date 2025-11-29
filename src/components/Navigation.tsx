import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-clickad.png";
import { scrollToSection } from "@/lib/navigation";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#included", label: "What's Included" },
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#pricing", label: "Pricing" },
  ];

  const companyLinks = [
    { href: "/home", label: "Our Work" },
    { href: "/about", label: "About Us" },
    { href: "/loom-library", label: "Free Audits" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-2 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="ClickAd Media" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const hash = link.href.replace('#', '');
                  scrollToSection(hash);
                }}
                className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none">
                Company
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-50">
                {companyLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="glow" size="sm" asChild className="hidden md:flex">
              <Link to="/audit">Get a Quote</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const hash = link.href.replace('#', '');
                        scrollToSection(hash);
                        setIsOpen(false);
                      }}
                      className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))}
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="glow" asChild className="w-full mt-4">
                    <Link to="/audit" onClick={() => setIsOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
