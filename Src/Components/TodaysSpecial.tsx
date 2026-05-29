import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Flame, Star, Clock } from "lucide-react";

const SPECIALS = [
  {
    id: "p4",
    name: "Paneer Paratha",
    price: 99,
    originalPrice: 129,
    emoji: "🫓",
    tag: "Chef's Pick",
    tagColor: "from-yellow-500 to-orange-500",
    desc: "Crispy golden paratha stuffed with fresh paneer & aromatic spices",
    highlight: "Best Seller",
    accentColor: "#f7a600",
    glowColor: "rgba(247,166,0,0.4)",
  },
  {
    id: "p3",
    name: "Mix Paratha",
    price: 89,
    originalPrice: 109,
    emoji: "🫓",
    tag: "Today's Pick",
    tagColor: "from-purple-500 to-pink-500",
    desc: "A delightful mix of seasonal veggies wrapped in a perfectly toasted paratha",
    highlight: "Fan Favourite",
    accentColor: "#c084fc",
    glowColor: "rgba(192,132,252,0.4)",
  },
  {
    id: "b2",
    name: "Mojito",
    price: 59,
    originalPrice: 79,
    emoji: "🍹",
    tag: "Refreshing",
    tagColor: "from-green-400 to-emerald-600",
    desc: "Ice-cold, mint-fresh mojito — the perfect companion for a hot day",
    highlight: "Must Try",
    accentColor: "#34d399",
    glowColor: "rgba(52,211,153,0.4)",
  },
  {
    id: "b1",
    name: "Cold Coffee",
    price: 49,
    originalPrice: 69,
    emoji: "☕",
    tag: "Morning Fave",
    tagColor: "from-amber-400 to-yellow-600",
    desc: "Rich, creamy cold coffee blended to perfection — your daily ritual",
    highlight: "Top Rated",
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.4)",
  },
  {
    id: "m2",
    name: "Veg Maggie",
    price: 59,
    originalPrice: 75,
    emoji: "🍜",
    tag: "Comfort Food",
    tagColor: "from-red-400 to-rose-600",
    desc: "Loaded veggie maggie with a secret masala blend — pure nostalgia in a bowl",
    highlight: "Crowd Pleaser",
    accentColor: "#f87171",
    glowColor: "rgba(248,113,113,0.4)",
  },
];

const ROTATE_INTERVAL = 4000;

export default function TodaysSpecial() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setIsOrderModalOpen, addItem, setIsCartOpen } = useCart();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / ROTATE_INTERVAL) * 100, 100));
    }, 50);

    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % SPECIALS.length);
        setAnimating(false);
      }, 400);
      elapsed = 0;
      setProgress(0);
    }, ROTATE_INTERVAL);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
    startCycle();
  };

  const special = SPECIALS[active];

  const handleAddToCart = () => {
    addItem({ id: special.id, name: special.name, price: special.price, emoji: special.emoji });
    setIsCartOpen(true);
  };

  const discount = Math.round(((special.originalPrice - special.price) / special.originalPrice) * 100);

  return (
    <section className="relative py-20 overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(247,166,0,0.5) 60px, rgba(247,166,0,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(247,166,0,0.5) 60px, rgba(247,166,0,0.5) 61px)`,
        }}
      />

      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${special.glowColor} 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-5 py-2 rounded-full text-sm font-semibold font-sans mb-4 shadow-[0_0_15px_rgba(247,166,0,0.15)]">
            <Flame className="w-4 h-4 animate-pulse" />
            Today's Special
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-white">
            Fresh &amp;{" "}
            <span
              className="transition-all duration-500"
              style={{ color: special.accentColor, textShadow: `0 0 30px ${special.glowColor}` }}
            >
              Irresistible
            </span>
          </h2>
          <p className="font-sans text-gray-500 mt-2 text-sm">Auto-rotating — every dish, a moment to savour</p>
        </div>

        <div
          className="relative rounded-3xl border overflow-hidden transition-all duration-500"
          style={{ borderColor: `${special.accentColor}30` }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(ellipse at 60% 50%, ${special.accentColor}, transparent 70%)`,
            }}
          />

          <div
            className={`relative z-10 grid md:grid-cols-2 gap-0 transition-all duration-400 ${
              animating ? "opacity-0 translate-y-3 scale-[0.99]" : "opacity-100 translate-y-0 scale-100"
            }`}
            style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
          >
            <div className="flex flex-col justify-center p-8 sm:p-12 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`bg-gradient-to-r ${special.tagColor} text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide font-sans`}
                >
                  {special.tag}
                </span>
                <span className="flex items-center gap-1 text-xs font-sans font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-emerald-400" />
                  {special.highlight}
                </span>
                <span className="text-xs font-sans font-bold text-white bg-red-500/80 px-2.5 py-1 rounded-full">
                  {discount}% OFF
                </span>
              </div>

              <div>
                <h3
                  className="font-bebas text-5xl sm:text-6xl tracking-wide leading-none transition-all duration-500"
                  style={{ color: special.accentColor }}
                >
                  {special.name}
                </h3>
                <p className="font-sans text-gray-400 mt-3 text-base leading-relaxed max-w-sm">
                  {special.desc}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span
                  className="font-bebas text-5xl transition-all duration-500"
                  style={{ color: special.accentColor }}
                >
                  ₹{special.price}
                </span>
                <span className="font-sans text-gray-600 line-through text-xl">₹{special.originalPrice}</span>
                <span className="font-sans text-emerald-400 text-sm font-semibold">
                  Save ₹{special.originalPrice - special.price}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-bold font-sans text-sm transition-all duration-300 text-black shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: special.accentColor,
                    boxShadow: `0 0 20px ${special.glowColor}`,
                  }}
                  data-testid="button-add-special-to-cart"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-bold font-sans text-sm border transition-all duration-300 hover:bg-white/5"
                  style={{ borderColor: `${special.accentColor}50`, color: special.accentColor }}
                  data-testid="button-order-special-now"
                >
                  Order Now →
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-xs font-sans">
                <Clock className="w-3.5 h-3.5" />
                <span>Offer valid today only · Limited qty</span>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center p-8 relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${special.accentColor}, transparent 65%)`,
                }}
              />
              <div
                className="relative text-[160px] drop-shadow-2xl transition-all duration-500 select-none"
                style={{
                  filter: `drop-shadow(0 0 40px ${special.glowColor})`,
                }}
              >
                {special.emoji}
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, transparent, ${special.accentColor})`,
              boxShadow: `0 0 8px ${special.glowColor}`,
            }}
          />
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {SPECIALS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="relative flex items-center justify-center transition-all duration-300 rounded-full"
              style={{
                width: idx === active ? "36px" : "10px",
                height: "10px",
                background: idx === active ? special.accentColor : "rgba(255,255,255,0.15)",
                boxShadow: idx === active ? `0 0 10px ${special.glowColor}` : "none",
              }}
              aria-label={`View special ${idx + 1}`}
              data-testid={`dot-special-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
