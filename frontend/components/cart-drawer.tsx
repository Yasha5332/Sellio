'use client';

import * as React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  renderIllustration?: () => React.ReactNode;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-base font-bold text-zinc-950">Your Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 font-semibold text-zinc-600">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-zinc-800">Your cart is empty</p>
                <p className="text-xs text-zinc-500">Explore the gear and add items to your cart.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden">
                    {item.renderIllustration ? item.renderIllustration() : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-950 truncate">{item.name}</h4>
                    <p className="text-[11px] text-zinc-500 truncate">{item.description}</p>
                    <p className="text-xs font-black text-zinc-900 mt-1">
                      {item.price.toLocaleString()} Ks
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-zinc-200 bg-white rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 rounded-l text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 rounded-r text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>{total.toLocaleString()} Ks</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Delivery fee</span>
                  <span className="text-emerald-600 font-semibold">Free (Yangon demo)</span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span>{total.toLocaleString()} Ks</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-full bg-[#3b36ec] hover:bg-[#322cd3] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to QR Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
