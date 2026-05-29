import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { CartProvider } from "@/context/CartContext";
import Lenis from "@studio-freight/lenis";
import AOS from 'aos';
import 'aos/dist/aos.css';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
    
    function raf(time: number) { 
      lenis.raf(time); 
      requestAnimationFrame(raf); 
    }
    requestAnimationFrame(raf);

    // Scroll reveal
    AOS.init({ 
      duration: 800, 
      once: true, 
      easing: 'ease-out-cubic' 
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
