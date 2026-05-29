import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Send, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, total, clearCart, setIsOrderModalOpen } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }

    let message = `*New Order from Aunty Ke Parathe Website*\n\n`;
    message += `*Customer:* ${customerName.trim()}\n\n`;
    message += `*Order Details:*\n`;
    items.forEach(item => {
      message += `${item.emoji} ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total: ₹${total}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917017320153?text=${encodedMessage}`, '_blank');
  };

  const handleOpenOrderModal = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsOrderModalOpen(true), 300);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-primary/20 z-50 shadow-2xl flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
        data-testid="cart-sidebar"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5 shrink-0">
          <h2 className="font-bebas text-2xl tracking-wide text-primary flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
            {items.length > 0 && (
              <span className="font-sans text-sm bg-primary text-black rounded-full px-2 py-0.5 font-bold ml-1">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            data-testid="button-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4 py-16">
              <span className="text-5xl opacity-50">🍽️</span>
              <p className="font-sans font-medium text-base text-gray-400">Your cart is empty</p>
              <p className="font-sans text-sm text-gray-600">Add items from the menu to get started</p>
              <button
                onClick={handleOpenOrderModal}
                className="mt-4 px-6 py-2.5 border border-primary/40 text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-200 font-sans"
                data-testid="button-open-order-form"
              >
                Browse & Order
              </button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center bg-white/[0.04] p-3.5 rounded-xl border border-white/5 group relative"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="text-2xl bg-black/60 p-2.5 rounded-lg border border-white/10 shrink-0">
                    {item.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-semibold text-sm text-white truncate">{item.name}</h4>
                    <div className="text-primary font-bold text-sm mt-0.5 font-sans">
                      ₹{item.price * item.quantity}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-black rounded-lg border border-primary/25">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-primary hover:bg-primary/20 rounded-l-lg transition-colors"
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-white font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-primary hover:bg-primary/20 rounded-r-lg transition-colors"
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-600 font-sans">₹{item.price} each</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    data-testid={`button-remove-${item.id}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => clearCart()}
                className="text-xs text-gray-600 hover:text-red-400 transition-colors font-sans w-full text-right pr-1"
                data-testid="button-clear-cart"
              >
                Clear all
              </button>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-white/5 shrink-0 bg-black/40 backdrop-blur-sm space-y-4">
            <div>
              <label className="block font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => { setCustomerName(e.target.value); setNameError(false); }}
                placeholder="Enter your name to order"
                className={cn(
                  "w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white font-sans text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all",
                  nameError
                    ? "border-red-500/60 focus:ring-red-500"
                    : "border-white/10 focus:border-primary focus:ring-primary"
                )}
                data-testid="input-cart-customer-name"
              />
              {nameError && (
                <p className="text-red-400 text-xs mt-1 font-sans">Please enter your name</p>
              )}
            </div>

            <div className="space-y-2 text-sm font-sans">
              <div className="flex justify-between text-gray-500">
                <span>{items.reduce((s, i) => s + i.quantity, 0)} items</span>
                <span>₹{total}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between font-bold text-lg">
                <span className="text-white">Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] transform hover:-translate-y-0.5 font-sans"
              data-testid="button-whatsapp-order"
            >
              <span className="text-xl">💬</span>
              Order on WhatsApp
              <Send className="w-4 h-4" />
            </button>
            <p className="text-center text-gray-600 text-xs font-sans">
              WhatsApp opens with your complete order
            </p>
          </div>
        )}
      </div>
    </>
  );
}
