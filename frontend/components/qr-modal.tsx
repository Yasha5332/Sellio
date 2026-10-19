'use client';

import * as React from 'react';
import {
  X,
  QrCode,
  Upload,
  CheckCircle2,
  Copy,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  itemCount: number;
}

export function QrModal({ isOpen, onClose, totalAmount, itemCount }: QrModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<'kbzpay' | 'wavepay'>('kbzpay');
  const [receiptUploaded, setReceiptUploaded] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFakeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptUploaded(true);
    }
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setOrderConfirmed(false);
    setReceiptUploaded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden text-zinc-900">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#3b36ec] text-white flex items-center justify-center shadow-sm">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950">QR Checkout</h3>
              <p className="text-[11px] text-zinc-500">Fast & Direct Mobile Payment</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-zinc-950">Order Sent Successfully!</h4>
            <p className="text-xs text-zinc-600 max-w-xs mx-auto leading-relaxed">
              Your payment receipt has been submitted. The shop will verify your payment and notify you shortly.
            </p>
            <div className="bg-zinc-50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-zinc-100">
              <div className="flex justify-between">
                <span className="text-zinc-500">Order ID:</span>
                <span className="font-mono font-bold text-zinc-800">#SLM-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Paid:</span>
                <span className="font-bold text-zinc-900">{totalAmount.toLocaleString()} Ks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Payment Channel:</span>
                <span className="font-medium uppercase text-zinc-800">{paymentMethod}</span>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="w-full py-3 rounded-full bg-[#111317] hover:bg-black text-white text-xs font-bold transition-all shadow-md"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          /* Checkout Steps */
          <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            {/* Total Pill */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div>
                <span className="text-[11px] text-zinc-500 block">Total Payable ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span className="text-lg font-black text-zinc-950">{totalAmount.toLocaleString()} Ks</span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#dbf85f] text-zinc-950">
                Direct QR
              </span>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('kbzpay')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'kbzpay'
                      ? 'border-[#3b36ec] bg-blue-50/60 ring-2 ring-[#3b36ec]/20'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                    KP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">KBZPay</div>
                    <div className="text-[10px] text-zinc-500">Instant scan</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wavepay')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'wavepay'
                      ? 'border-[#eab308] bg-yellow-50/60 ring-2 ring-[#eab308]/20'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-yellow-400 text-zinc-900 flex items-center justify-center font-black text-xs">
                    WP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">WavePay</div>
                    <div className="text-[10px] text-zinc-500">Fast transfer</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: QR Display */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5 text-center space-y-3">
              <span className="text-[11px] font-bold text-[#3b36ec] uppercase tracking-wider block">
                Step 2: Scan QR Code
              </span>
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-dashed border-zinc-300 shadow-sm flex items-center justify-center relative">
                {/* Simulated High-Res QR Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900">
                  <path fill="currentColor" d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM60 20h10v10h-10zM80 30h10v20h-10zM10 50h10v10h-10zM30 50h20v20h-20zM60 50h10v10h-10zM80 50h10v10h-10zM10 70h30v20h-30zM50 70h10v20h-10zM70 70h20v20h-20z M20 20h10v10h-10z M80 20h0v0h0z M20 80h10v0h-10z" />
                  <rect x="42" y="42" width="16" height="16" rx="4" fill="#3b36ec" />
                  <circle cx="50" cy="50" r="3" fill="#ffffff" />
                </svg>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
                <span>Account: <strong className="text-zinc-900">09-987654321</strong></span>
                <button
                  onClick={() => handleCopyAccount('09-987654321')}
                  className="p-1 text-zinc-400 hover:text-black transition-colors"
                  title="Copy number"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
              </div>
            </div>

            {/* Step 3: Upload Screenshot */}
            <div>
              <span className="text-[11px] font-bold text-[#3b36ec] uppercase tracking-wider block mb-2">
                Step 3: Upload Payment Screenshot
              </span>
              <label className={`block border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                receiptUploaded
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFakeUpload}
                  className="hidden"
                />
                {receiptUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Receipt image selected! (Ready to confirm)</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-5 h-5 text-zinc-400 mx-auto" />
                    <div className="text-xs font-semibold text-zinc-700">Click to upload payment screenshot</div>
                    <div className="text-[10px] text-zinc-400">JPG, PNG or Screenshot from KBZPay/Wave</div>
                  </div>
                )}
              </label>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-full text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                isSubmitting ? 'bg-zinc-400 cursor-wait' : 'bg-[#111317] hover:bg-black active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <span>Submitting Receipt...</span>
              ) : (
                <>
                  <span>Confirm Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
