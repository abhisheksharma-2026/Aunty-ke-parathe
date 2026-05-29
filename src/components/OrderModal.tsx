import { useState } from "react";
import { X, Minus, Plus, Send, ShoppingBag, CheckCircle } from "lucide-react";
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

const CATEGORIES = ["Parathas", "Maggies", "Sandwiches", "Beverages"];

type OrderQty = Record<string, number>;

export default function OrderModal() {
  const { isOrderModalOpen, setIsOrderModalOpen, addItem } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [quantities, setQuantities] = useState<OrderQty>({});
  const [step, setStep] = useState<"form" | "success">("form");
  const [nameError, setNameError] = useState(false);
  const [itemError, setItemError] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: next };
    });
    setItemError(false);
  };

  const selectedItems = MENU_ITEMS.filter((item) => (quantities[item.id] ?? 0) > 0);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0
  );
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleSendOrder = () => {
    const hasName = customerName.trim().length > 0;
    const hasItems = selectedItems.length > 0;

    if (!hasName) setNameError(true);
    if (!hasItems) setItemError(true);
    if (!hasName || !hasItems) return;

    let message = `*New Order from Aunty Ke Parathe Website*\n\n`;
    message += `*Customer:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) {
      message += `*Phone:* ${customerPhone.trim()}\n`;
    }
    message += `\n*Order Details:*\n`;
    selectedItems.forEach((item) => {
      const qty = quantities[item.id] ?? 0;
      message += `${item.emoji} ${item.name} x${qty} = ₹${item.price * qty}\n`;
    });
    message += `\n*Total Amount: ₹${total}*`;
    if (note.trim()) {
      message += `\n\n*Special Note:* ${note.trim()}`;
    }

    selectedItems.forEach((item) => {
      for (let i = 0; i < (quantities[item.id] ?? 0); i++) {
        addItem({ id: item.id, name: item.name, price: item.price, emoji: item.emoji });
      }
    });

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917017320153?text=${encodedMessage}`, "_blank");

    setStep("success");
  };

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setTimeout(() => {
      setStep("form");
      setCustomerName("");
      setCustomerPhone("");
      setNote("");
      setQuantities({});
      setNameError(false);
      setItemError(false);
    }, 400);
  };

  if (!isOrderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0a0a0a] border border-primary/30 rounded-3xl shadow-[0_0_60px_rgba(247,166,0,0.15)] overflow-hidden animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
        data-testid="order-modal"
      >
        {step === "success" ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center animate-[pulse_2s_infinite]">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-bebas text-4xl text-white tracking-wide">Order Sent!</h2>
            <p className="font-sans text-gray-300 max-w-xs leading-relaxed">
              WhatsApp has opened with your order. Send it to complete your booking. We'll get it ready for you!
            </p>
            <p className="font-great-vibes text-2xl text-primary">"Made with love, served with smile."</p>
            <button
              onClick={handleClose}
              className="mt-4 bg-primary text-black font-bold px-10 py-3 rounded-full hover:bg-white transition-colors duration-300"
              data-testid="button-close-success"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0">
              <div>
                <h2 className="font-bebas text-3xl tracking-wide text-white flex items-center gap-2">
                  <ShoppingBag className="w-7 h-7 text-primary" />
                  Place Your Order
                </h2>
                <p className="font-sans text-xs text-gray-500 mt-0.5">We'll confirm on WhatsApp</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6 scrollbar-thin">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => { setCustomerName(e.target.value); setNameError(false); }}
                    placeholder="e.g. Rahul Kumar"
                    className={cn(
                      "w-full bg-white/5 border rounded-xl px-4 py-3 text-white font-sans text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all",
                      nameError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:border-primary focus:ring-primary"
                    )}
                    data-testid="input-customer-name"
                  />
                  {nameError && (
                    <p className="text-red-400 text-xs mt-1 font-sans">Please enter your name</p>
                  )}
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Phone Number <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    data-testid="input-customer-phone"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Select Items <span className="text-primary">*</span>
                  </label>
                  {itemError && (
                    <span className="text-red-400 text-xs font-sans">Please select at least one item</span>
                  )}
                </div>

                <div className="space-y-4">
                  {CATEGORIES.map((cat) => {
                    const catItems = MENU_ITEMS.filter((m) => m.category === cat);
                    return (
                      <div key={cat}>
                        <h3 className="font-bebas text-sm tracking-widest text-primary/70 mb-2 px-1">{cat}</h3>
                        <div className="space-y-2">
                          {catItems.map((item) => {
                            const qty = quantities[item.id] ?? 0;
                            const isSelected = qty > 0;
                            return (
                              <div
                                key={item.id}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                                  isSelected
                                    ? "bg-primary/5 border-primary/40 shadow-[0_0_12px_rgba(247,166,0,0.08)]"
                                    : "bg-white/[0.03] border-white/5 hover:border-white/10"
                                )}
                                data-testid={`item-row-${item.id}`}
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <span className="text-xl">{item.emoji}</span>
                                  <div className="min-w-0">
                                    <p className="font-sans text-sm font-semibold text-white truncate">{item.name}</p>
                                    <p className="font-sans text-xs text-primary font-medium">₹{item.price}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {isSelected ? (
                                    <>
                                      <button
                                        onClick={() => updateQty(item.id, -1)}
                                        className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 flex items-center justify-center transition-colors"
                                        data-testid={`button-decrease-${item.id}`}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-6 text-center font-bold text-white text-sm font-sans">
                                        {qty}
                                      </span>
                                      <button
                                        onClick={() => updateQty(item.id, 1)}
                                        className="w-8 h-8 rounded-full bg-primary text-black hover:bg-white flex items-center justify-center transition-colors"
                                        data-testid={`button-increase-${item.id}`}
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => updateQty(item.id, 1)}
                                      className="px-4 py-1.5 rounded-full border border-primary/40 text-primary text-xs font-semibold font-sans hover:bg-primary hover:text-black transition-all duration-200"
                                      data-testid={`button-add-${item.id}`}
                                    >
                                      + Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Special Instructions <span className="text-gray-600">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Extra butter, less spicy..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  data-testid="input-special-note"
                />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-white/5 shrink-0 bg-black/30 backdrop-blur-sm">
              {selectedItems.length > 0 && (
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="font-sans text-sm text-gray-400">
                    {totalItems} item{totalItems !== 1 ? "s" : ""} selected
                  </div>
                  <div className="font-sans font-bold text-xl text-primary">
                    Total: ₹{total}
                  </div>
                </div>
              )}

              <button
                onClick={handleSendOrder}
                disabled={!customerName.trim() || selectedItems.length === 0}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold font-sans text-base flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group",
                  customerName.trim() && selectedItems.length > 0
                    ? "bg-[#25D366] hover:bg-[#1EBE5D] text-black shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:-translate-y-0.5"
                    : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                )}
                data-testid="button-send-whatsapp"
              >
                <span className="text-2xl">💬</span>
                Send Order on WhatsApp
                <Send className="w-4 h-4" />
              </button>
              <p className="text-center text-gray-600 text-xs font-sans mt-3">
                WhatsApp will open automatically with your complete order
              </p>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes modalIn {
          0% { opacity: 0; transform: scale(0.92) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
