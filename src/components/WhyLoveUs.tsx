import { cn } from "@/lib/utils";
import { Leaf, Home, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "Farm-fresh veggies, daily sourced",
  },
  {
    icon: Home,
    title: "Homemade Taste",
    desc: "Aunty's secret recipes, unchanged",
  },
  {
    icon: Zap,
    title: "Fast Service",
    desc: "Hot food in under 10 minutes",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Kitchen",
    desc: "Certified clean, cooked with care",
  }
];

export default function WhyLoveUs() {
  return (
    <section id="about" className="py-24 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-white">
            Why People <span className="text-primary">Love Us</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_#f7a600]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div 
              key={feature.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center group hover:-translate-y-2 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(247,166,0,0.15)]"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-black/50 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(247,166,0,0.4)]">
                <feature.icon className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_rgba(247,166,0,0.8)]" />
              </div>
              <h3 className="font-sans font-bold text-xl text-white mb-3">{feature.title}</h3>
              <p className="font-sans text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}