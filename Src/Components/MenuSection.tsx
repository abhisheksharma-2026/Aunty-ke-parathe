import { useState, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "p1", name: "Aalu Paratha", price: 59, category: "Parathas", emoji: "🫓" },
  { id: "p2", name: "Aalu Pyaj Paratha", price: 69, category: "Parathas", emoji: "🫓" },
  { id: "p3", name: "Mix Paratha", price: 89, category: "Parathas", emoji: "🫓" },
  { id: "p4", name: "Paneer Paratha", price: 99, category: "Parathas", emoji: "🫓" },
  
  { id: "m1", name: "Maggie", price: 49, category: "Maggies", emoji: "🍜" },
  { id: "m2", name: "Veg Maggie", price: 59, category: "Maggies", emoji: "🍜" },
  
  { id: "s1", name: "Aalu Sandwich", price: 49, category: "Sandwiches", emoji: "🥪" },
  { id: "s2", name: "Veggie Sandwich", price: 59, category: "Sandwiches", emoji: "🥪" },
  
  { id: "b1", name: "Cold Coffee", price: 49, category: "Beverages", emoji: "☕" },
  { id: "b2", name: "Mojito", price: 59, category: "Beverages", emoji: "🍹" },
];

const CATEGORIES = ["All", "Parathas", "Maggies", "Sandwiches", "Beverages"];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem, setIsCartOpen } = useCart();
  const [toast, setToast] = useState<{ show: boolean, name: string }>({ show: false, name: "" });

  const filteredMenu = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  useEffect(() => {
    const cards = document.querySelectorAll(".menu-card");
    if (cards.length > 0) {
      VanillaTilt.init(cards as unknown as HTMLElement[], {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
      });
    }
  }, [filteredMenu]);

  const handleAddToCart = (item: any) => {
    addItem({ id: item.id, name: item.name, price: item.price, emoji: item.emoji });
    setToast({ show: true, name: item.name });
    setTimeout(() => setToast({ show: false, name: "" }), 2500);
  };

  return (
    <section id="menu" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl flex justify-center gap-4 items-end">
            <span className="font-great-vibes text-primary transform -rotate-3 mb-1">Our</span>
            <span className="font-bebas tracking-wide">MENU</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_#f7a600]"></div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat 
                  ? "bg-primary text-black shadow-[0_0_15px_rgba(247,166,0,0.5)]" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item, index) => (
            <div 
              key={item.id} 
              className="menu-card bg-[rgba(15,15,15,0.8)] backdrop-blur-md border border-primary/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(247,166,0,0.15)] hover:border-primary/50 group"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="w-24 h-24 rounded-full bg-black/50 border border-primary/30 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(247,166,0,0.1)] group-hover:shadow-[inset_0_0_30px_rgba(247,166,0,0.3)]">
                <span className="text-4xl filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(247,166,0,0.5)] transition-all duration-300">{item.emoji}</span>
              </div>
              
              <h3 className="font-sans font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="font-sans text-xl font-medium text-primary mb-6">₹{item.price}</p>
              
              <button 
                onClick={() => handleAddToCart(item)}
                className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                <span>+ Add</span>
                <span className="text-lg group-hover/btn:animate-[wobble_1.5s_infinite]">🛒</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      <div className={cn(
        "fixed bottom-6 left-6 z-50 bg-black/90 border border-primary rounded-lg px-6 py-4 shadow-[0_0_20px_rgba(247,166,0,0.3)] transition-all duration-500 flex items-center gap-3 backdrop-blur-md",
        toast.show ? "translate-x-0 opacity-100" : "-translate-x-[150%] opacity-0"
      )}>
        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
          ✓
        </div>
        <div className="font-sans text-sm font-medium text-white">
          <span className="text-primary">{toast.name}</span> added to cart!
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="ml-4 text-xs font-bold text-black bg-primary px-3 py-1.5 rounded hover:bg-white transition-colors"
        >
          VIEW
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wobble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}} />
    </section>
  );
}