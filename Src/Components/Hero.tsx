import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function Hero() {
  const { setIsOrderModalOpen } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 2.2, // After loading screen
        ease: "power3.out",
      });

      if (subtitleRef.current) {
        const letters = subtitleRef.current.querySelectorAll("span");
        gsap.from(letters, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 2.8,
          ease: "back.out(1.7)",
        });
      }

      gsap.from(foodRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: -15,
        duration: 1.5,
        delay: 2.5,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.to(foodRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjQ3LCAxNjYsIDAsIDAuMDUpIi8+PC9zdmc+')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left space-y-6">
          <div ref={titleRef}>
            <h2 className="font-great-vibes text-5xl md:text-7xl text-primary mb-[-1rem] md:mb-[-1.5rem] relative z-10 transform -rotate-2 inline-block">
              Aunty Ke
            </h2>
            <h1 className="font-bebas text-7xl md:text-9xl text-white leading-none tracking-tight drop-shadow-[0_0_20px_rgba(247,166,0,0.3)]">
              PARATHE
            </h1>
          </div>
          
          <div ref={subtitleRef} className="font-sans font-medium text-gray-300 tracking-[0.2em] text-sm md:text-base">
            {"GOOD FOOD. GOOD MOOD.".split("").map((char, i) => (
              <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <a href="#menu" className="bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(247,166,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transform hover:-translate-y-1">
              Explore Menu
            </a>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="border border-primary text-primary px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(247,166,0,0.2)] hover:shadow-[0_0_25px_rgba(247,166,0,0.5)]"
            >
              Order Now 🛒
            </button>
          </div>
        </div>

        {/* Visual Content */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          
          {/* Steam */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-64 z-20 opacity-30 flex gap-4">
            <div className="w-2 h-full bg-white blur-xl animate-[rise_3s_ease-in-out_infinite]"></div>
            <div className="w-3 h-full bg-white blur-xl animate-[rise_4s_ease-in-out_infinite_0.5s]"></div>
            <div className="w-2 h-full bg-white blur-xl animate-[rise_3.5s_ease-in-out_infinite_1s]"></div>
          </div>

          {/* Golden glow frame */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-primary/30 shadow-[0_0_50px_rgba(247,166,0,0.2)] animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-primary/20 animate-[spin_30s_linear_infinite_reverse]"></div>

          {/* Main Food Element */}
          <div ref={foodRef} className="relative z-30 flex items-center justify-center w-64 h-64 md:w-96 md:h-96 rounded-full bg-black/50 backdrop-blur-sm border border-primary/20 shadow-[inset_0_0_50px_rgba(247,166,0,0.1)]">
            <span className="text-[120px] md:text-[180px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_20px_rgba(247,166,0,0.4)]">🫓</span>
          </div>

          {/* Orbiting particles */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#f7a600] animate-[orbit_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_5px_#fff] animate-[orbit_15s_linear_infinite_reverse]"></div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rise {
          0% { transform: translateY(20px) scaleX(1); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) scaleX(2); opacity: 0; }
        }
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
        }
      `}} />
    </section>
  );
}