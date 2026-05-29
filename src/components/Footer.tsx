import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-primary/20 pt-16 pb-8 overflow-hidden z-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          
          <div className="flex flex-col items-center">
            <span className="font-great-vibes text-4xl text-primary transform -rotate-2 mb-1">Aunty Ke</span>
            <span className="font-bebas text-5xl tracking-widest text-white">PARATHE</span>
          </div>
          
          <p className="font-sans italic text-gray-400 max-w-sm">
            "Made with love, served with smile."
          </p>

          <div className="flex items-center gap-6 pt-4">
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,166,0,0.5)]">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,166,0,0.5)]">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,166,0,0.5)]">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-sans">
          <div>&copy; {new Date().getFullYear()} Aunty Ke Parathe. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Animated bottom particles */}
      <div className="absolute bottom-0 left-0 w-full h-1 flex justify-between px-10">
        <div className="w-1 h-1 bg-primary rounded-full animate-[ping_2s_infinite]"></div>
        <div className="w-1 h-1 bg-primary rounded-full animate-[ping_3s_infinite_1s]"></div>
        <div className="w-1 h-1 bg-primary rounded-full animate-[ping_2.5s_infinite_0.5s]"></div>
        <div className="w-1 h-1 bg-primary rounded-full animate-[ping_4s_infinite]"></div>
      </div>
    </footer>
  );
}