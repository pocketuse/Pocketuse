import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import AppDevelopment from "./pages/AppDevelopment";
import AppMarketing from "./pages/AppMarketing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Showcase from "./pages/Showcase";
import Ritual from "./pages/Ritual";
import RitualPrivacy from "./pages/RitualPrivacy";
import RitualTerms from "./pages/RitualTerms";
import TemplateCustomization from "./pages/TemplateCustomization";
import StoreSubmission from "./pages/StoreSubmission";
import PremiumApps from "./pages/PremiumApps";
import Tools from "./pages/Tools";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { ThemeProvider } from "./components/ThemeProvider";
import { PageTransition } from "./components/PageTransition";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/app-development" element={<PageTransition><AppDevelopment /></PageTransition>} />
        <Route path="/app-marketing" element={<PageTransition><AppMarketing /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/cookie-policy" element={<PageTransition><CookiePolicy /></PageTransition>} />
        <Route path="/showcase" element={<PageTransition><Showcase /></PageTransition>} />
        <Route path="/ritual" element={<PageTransition><Ritual /></PageTransition>} />
        <Route path="/ritual/privacy" element={<PageTransition><RitualPrivacy /></PageTransition>} />
        <Route path="/ritual/terms" element={<PageTransition><RitualTerms /></PageTransition>} />
        <Route path="/template-setup" element={<PageTransition><TemplateCustomization /></PageTransition>} />
        <Route path="/store-submission" element={<PageTransition><StoreSubmission /></PageTransition>} />
        <Route path="/premium-apps" element={<PageTransition><PremiumApps /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
        <Route path="/tools/:toolId" element={<PageTransition><Tools /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <AnimatedRoutes />
          <ScrollToTopButton />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}
