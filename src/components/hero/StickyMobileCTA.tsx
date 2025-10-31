import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const scrolled = window.scrollY > window.innerHeight;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleClick = () => {
    // Scroll to top where the hero form is
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Track click event
    if (window.Trakrly) {
      window.Trakrly.click({
        event: "sticky_cta_clicked",
        location: "mobile_sticky_button",
      });
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 md:hidden"
        >
          <div className="relative">
            <Button
              onClick={handleClick}
              size="lg"
              variant="glow"
              className="shadow-premium rounded-full pl-6 pr-8 py-6 text-base font-bold"
            >
              <Phone className="w-5 h-5 mr-2" />
              Book Free Quote
            </Button>
            
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
