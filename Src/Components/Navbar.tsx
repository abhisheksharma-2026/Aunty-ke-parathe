import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, setIsCartOpen } = useCart();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (count > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Specials", href: "#specials" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-primary/20 py-3 shadow-lg shadow-primary/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 relative z-50">
          <span className="font-great-vibes text-3xl md:text-4xl text-primary transform -rotate-2">
            Aunty Ke
          </span>
          <span className="font-bebas text-2xl md:text-3xl tracking-wider text-white mt-2">
            PARATHE
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(247,166,0,0.8)]"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-primary transition-colors flex items-center justify-center group"
          >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
              <span
                className={cn(
                  "absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-black",
                  bounce && "animate-bounce"
                )}
              >
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-white hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bebas tracking-widest text-white hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
