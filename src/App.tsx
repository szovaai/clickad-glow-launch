import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import Index from "./pages/Index";
import About from "./pages/About";
import Audit from "./pages/Audit";
import ThankYou from "./pages/ThankYou";
import Resume from "./pages/Resume";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import CalgaryElectricianWebsites from "./pages/services/CalgaryElectricianWebsites";
import CalgaryRenovationWebsites from "./pages/services/CalgaryRenovationWebsites";
import CalgaryIndustrialWebsites from "./pages/services/CalgaryIndustrialWebsites";
import CalgaryWebsiteDesign from "./pages/services/CalgaryWebsiteDesign";
import LoomLibrary from "./pages/LoomLibrary";
import UltimateSuite from "./pages/packages/UltimateSuite";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Track pageview on route change
    if (window.Trakrly) {
      window.Trakrly.pv();
    }
  }, [location.pathname]);

  return (
    <Routes>
          <Route path="/" element={<UltimateSuite />} />
          <Route path="/home" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services/calgary-electrician-websites" element={<CalgaryElectricianWebsites />} />
          <Route path="/services/calgary-renovation-contractor-websites" element={<CalgaryRenovationWebsites />} />
          <Route path="/services/calgary-industrial-manufacturing-websites" element={<CalgaryIndustrialWebsites />} />
          <Route path="/calgary-website-design" element={<CalgaryWebsiteDesign />} />
          <Route path="/loom-library" element={<LoomLibrary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ChatbotWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
