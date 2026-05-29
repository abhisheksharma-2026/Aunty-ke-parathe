import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import menuImg from "@assets/IMG-20260523-WA0028_1779818967685.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal and tilt
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        rotationX: 20,
        rotationZ: -5,
        duration: 1.5,
        ease: "power3.out",
      });

      // Text stagger reveal
      if (textRef.current) {
        const lines = textRef.current.children;
        gsap.from(lines, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="specials" className="py-24 relative overflow-hidden bg-black">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary rounded-full blur-[1px] opacity-40 animate-[float_10s_ease-in-out_infinite]"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div ref={textRef} className="space-y-6 z-10">
            <h2 className="text-5xl md:text-7xl">
              <span className="block font-great-vibes text-primary transform -rotate-2 mb-2">Our Signature</span>
              <span className="block font-bebas tracking-wide text-white drop-shadow-[0_0_15px_rgba(247,166,0,0.3)]">PARATHE</span>
            </h2>
            <p className="font-sans italic text-xl text-gray-300 max-w-md">
              "Made with love, served with smile."
            </p>
            <p className="font-sans text-gray-400 max-w-lg leading-relaxed">
              Experience the authentic taste of Indian street food elevated to a culinary art form. Our signature parathas are crafted with generation-old recipes, premium ingredients, and a touch of modern flair.
            </p>
            <div className="pt-6">
              <a href="#menu" className="inline-block bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(247,166,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                Explore Full Menu
              </a>
            </div>
          </div>

          <div className="relative z-10" ref={imageRef}>
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform scale-110 translate-y-10"></div>
            
            <div className="relative rounded-3xl overflow-hidden border border-primary/30 shadow-[0_20px_50px_rgba(247,166,0,0.2)] transform perspective-1000 rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img 
                src={menuImg} 
                alt="Signature Parathe" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <div className="font-great-vibes text-3xl text-primary drop-shadow-md">Aunty's Special</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-15px); }
        }
      `}} />
    </section>
  );
}
