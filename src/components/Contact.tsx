import { MapPin, Phone, MessageSquare } from "lucide-react";

export default function Contact() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/917017320153?text=Hi%20Aunty%20Ke%20Parathe!", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917017320153";
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-black/50 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-white">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_#f7a600]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8" data-aos="fade-right">
            <div className="bg-white/5 backdrop-blur-sm border border-primary/20 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors"></div>
              
              <h3 className="font-sans text-2xl font-bold text-white mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Find Us Here</div>
                    <div className="text-gray-400">Street Food Hub, Main Market</div>
                    <div className="text-gray-500 text-sm mt-1">Owner: Durgesh Goel</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Call Us</div>
                    <div className="text-gray-400">+91 70173 20153</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCall}
                  className="flex-1 bg-primary/10 hover:bg-primary border border-primary hover:border-transparent text-primary hover:text-black py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[inset_0_0_20px_rgba(247,166,0,0.1)] hover:shadow-[0_0_20px_rgba(247,166,0,0.4)]"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366] border border-[#25D366] hover:border-transparent text-[#25D366] hover:text-black py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[inset_0_0_20px_rgba(37,211,102,0.1)] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </button>
              </div>
            </div>
            
            {/* Fake Map */}
            <div className="h-48 rounded-2xl border border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/40 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="relative z-10 flex flex-col items-center gap-2 text-primary group-hover:scale-110 transition-transform duration-500">
                 <MapPin className="w-10 h-10 drop-shadow-[0_0_10px_#f7a600] animate-bounce" />
                 <span className="font-bebas text-xl tracking-wider text-white">Find Us Here</span>
               </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl" data-aos="fade-left">
            <h3 className="font-sans text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-white text-black py-4 rounded-xl font-bold uppercase tracking-wide transition-colors duration-300 shadow-[0_0_20px_rgba(247,166,0,0.2)]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}