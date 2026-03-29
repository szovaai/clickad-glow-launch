import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, Phone } from "lucide-react";
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
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services", isRoute: true },
    { href: "#process", label: "How It Works", isRoute: false },
    { href: "#pricing", label: "Pricing", isRoute: false },
    { href: "#faq", label: "FAQ", isRoute: false },
  ];

  const companyLinks = [
    { href: "/ai-audit", label: "AI Website Audit" },
    { href: "/home", label: "Our Work" },
    { href: "/about", label: "About Us" },
    { href: "/loom-library", label: "Free Audits" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-300",
            scrolled
              ? "border border-[hsl(0_0%_100%/0.08)] bg-[hsl(228_27%_5%/0.85)] backdrop-blur-xl shadow-lg"
              : "border border-transparent bg-transparent"
          )}
        >
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="ClickAd Media" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.replace('#', ''));
                  }}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                </a>
              )
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground outline-none">
                Company
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-[hsl(0_0%_100%/0.08)] z-50">
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
            <a
              href="tel:+18254518117"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (825) 451-8117
            </a>
            <Button variant="default" size="sm" asChild className="hidden md:flex">
              <Link to="/audit">Book Strategy Call</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-popover border-[hsl(0_0%_100%/0.06)]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) =>
                    link.isRoute ? (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href.replace('#', ''));
                          setIsOpen(false);
                        }}
                        className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="default" asChild className="w-full mt-4">
                    <Link to="/audit" onClick={() => setIsOpen(false)}>
                      Book Strategy Call
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
