import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { trackPageView } from "@/lib/analytics";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Audit from "./pages/Audit";
import ThankYou from "./pages/ThankYou";
import Resume from "./pages/Resume";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import CalgaryElectricianWebsites from "./pages/services/CalgaryElectricianWebsites";
import CalgaryRenovationWebsites from "./pages/services/CalgaryRenovationWebsites";
import CalgaryIndustrialWebsites from "./pages/services/CalgaryIndustrialWebsites";
import CalgaryWebsiteDesign from "./pages/services/CalgaryWebsiteDesign";
import LoomLibrary from "./pages/LoomLibrary";
import UltimateSuite from "./pages/packages/UltimateSuite";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PaymentSuccess from "./pages/PaymentSuccess";
import OnboardingChecklist from "./pages/OnboardingChecklist";

// App shell
import AppLayout from "./components/app/AppLayout";
import Login from "./pages/app/Login";
import Signup from "./pages/app/Signup";
import Dashboard from "./pages/app/Dashboard";
import Clients from "./pages/app/Clients";
import OnboardingWizard from "./pages/app/OnboardingWizard";
import PlaceholderPage from "./pages/app/PlaceholderPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    import('@/lib/webVitals').then(({ initWebVitals }) => {
      initWebVitals();
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (window.Trakrly) {
      window.Trakrly.pv();
    }
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Marketing site */}
      <Route path="/" element={<UltimateSuite />} />
      <Route path="/home" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/audit" element={<Audit />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/onboarding-checklist" element={<OnboardingChecklist />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/services/calgary-electrician-websites" element={<CalgaryElectricianWebsites />} />
      <Route path="/services/calgary-renovation-contractor-websites" element={<CalgaryRenovationWebsites />} />
      <Route path="/services/calgary-industrial-manufacturing-websites" element={<CalgaryIndustrialWebsites />} />
      <Route path="/calgary-website-design" element={<CalgaryWebsiteDesign />} />
      <Route path="/loom-library" element={<LoomLibrary />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* SaaS App — Auth */}
      <Route path="/app/login" element={<Login />} />
      <Route path="/app/signup" element={<Signup />} />

      {/* SaaS App — Protected */}
      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="onboarding" element={<OnboardingWizard />} />
        <Route path="chat" element={<PlaceholderPage title="AI Chat Qualifier" description="Embeddable AI chat widget with qualification flow and calendar booking." round={3} />} />
        <Route path="automations" element={<PlaceholderPage title="Automations" description="Missed-call text-back engine and follow-up sequence builder." round={4} />} />
        <Route path="voice" element={<PlaceholderPage title="Voice AI (Beta)" description="AI Receptionist with Gemini 3 integration-ready architecture." round={5} />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics" description="KPI dashboards, charts, and revenue estimator." round={6} />} />
        <Route path="integrations" element={<PlaceholderPage title="Integrations" description="GoHighLevel, Twilio, and Google Calendar connections." round={2} />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" description="Account settings, team management, and configuration." round={2} />} />
      </Route>

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
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <ChatbotWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
