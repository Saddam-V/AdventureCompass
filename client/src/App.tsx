import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Research from "@/pages/Research";
import Publications from "@/pages/Publications";
import Contact from "@/pages/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {location === '/' && <Home key="home" />}
          {location === '/about' && <About key="about" />}
          {location === '/research' && <Research key="research" />}
          {location === '/publications' && <Publications key="publications" />}
          {location === '/contact' && <Contact key="contact" />}
          {location !== '/' && 
           location !== '/about' && 
           location !== '/research' && 
           location !== '/publications' && 
           location !== '/contact' && <NotFound key="not-found" />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
