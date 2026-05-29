import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const TESTIMONIALS = [
  {
    name: "Rahul S.",
    initials: "RS",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    quote: "Best parathe in the city! Aunty's aalu paratha is pure nostalgia. 5 stars always! ⭐⭐⭐⭐⭐"
  },
  {
    name: "Priya M.",
    initials: "PM",
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    quote: "Paneer paratha hits different 🔥 The butter is so generous, quality is top notch!"
  },
  {
    name: "Arjun K.",
    initials: "AK",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    quote: "Cold coffee + mix paratha combo is unbeatable. Our go-to Sunday breakfast spot!"
  },
  {
    name: "Sneha R.",
    initials: "SR",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    quote: "Finally found the taste of home in the city. These parathe are made with real love! 💛"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-white">
            Word on the <span className="text-primary">Street</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 }
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12 !overflow-visible"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-colors duration-300">
                  <div className="flex gap-1 text-primary mb-6 drop-shadow-[0_0_5px_rgba(247,166,0,0.5)]">
                    ★★★★★
                  </div>
                  <p className="font-sans italic text-gray-300 text-lg flex-1 mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg ${t.color}`}>
                      {t.initials}
                    </div>
                    <div className="font-sans font-bold text-white">{t.name}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet { background: rgba(255,255,255,0.2); width: 10px; height: 10px; }
        .swiper-pagination-bullet-active { background: #f7a600; box-shadow: 0 0 10px #f7a600; }
      `}} />
    </section>
  );
}