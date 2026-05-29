import { useState, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import SpecialShowcase from "@/components/SpecialShowcase";
import WhyLoveUs from "@/components/WhyLoveUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import OrderModal from "@/components/OrderModal";
import TodaysSpecial from "@/components/TodaysSpecial";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Custom cursor glow
    const cursor = document.getElementById("cursor-glow");
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);

    // Scroll progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);

    // Loading screen animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false)
      });

      tl.from(".loader-char", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.5)"
      })
      .to(".loader-container", {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.inOut"
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      
      {/* Scroll Progress */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-primary z-50 transition-all duration-150 shadow-[0_0_10px_#f7a600]"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Cursor Glow */}
      <div 
        id="cursor-glow" 
        className="fixed w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen hidden md:block"
      ></div>

      {/* Loading Screen */}
      {loading && (
        <div className="loader-container fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col">
          <div className="flex items-center gap-4 text-4xl md:text-6xl font-bebas tracking-widest text-primary drop-shadow-[0_0_15px_rgba(247,166,0,0.5)]">
             {"AUNTY KE PARATHE".split("").map((char, i) => (
               <span key={i} className="loader-char inline-block">{char === " " ? "\u00A0" : char}</span>
             ))}
          </div>
          <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[loadingBar_2s_ease-in-out_forwards]"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar />
        <Hero />
        <TodaysSpecial />
        <MenuSection />
        <SpecialShowcase />
        <WhyLoveUs />
        <Testimonials />
        <Contact />
        <Footer />
        <CartSidebar />
        <OrderModal />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}