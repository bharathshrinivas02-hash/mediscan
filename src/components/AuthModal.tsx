import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('98401 23456');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setOtp('4821');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(`+91 ${phone.replace(/\D/g, '').slice(-10)}`);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="rounded-3xl max-w-md w-full bg-[#0b0f19]/90 backdrop-blur-2xl border border-white/[0.15] shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="p-6 text-white border-b border-white/[0.08] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded-full">
              Instant Access
            </span>
            <span className="text-xs text-slate-400">Quick & Secure</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">Sign in to MEDISCAN</h2>
          <p className="text-xs text-slate-400 mt-1">
            {step === 'phone'
              ? 'Enter your mobile number to get a secure one-time verification code'
              : `Verification code sent to +91 ${phone}`}
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 font-medium">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <div className="relative flex rounded-2xl border border-white/[0.12] focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 bg-white/[0.03] overflow-hidden">
                  <div className="bg-white/[0.05] border-r border-white/10 px-3.5 py-2.5 text-sm font-medium text-slate-300 flex items-center gap-1.5">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98401 23456"
                    maxLength={13}
                    autoFocus
                    className="flex-1 px-3 py-2.5 text-sm font-mono text-white bg-transparent focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  No password required. Instant login via SMS verification.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <span>Generating Code...</span>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Enter 4-Digit Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs text-orange-400 hover:underline font-medium"
                  >
                    Edit Phone
                  </button>
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="4821"
                    maxLength={4}
                    autoFocus
                    className="w-full pl-10 pr-3 py-2.5 text-center text-lg tracking-widest font-mono font-bold rounded-2xl bg-white/[0.04] border border-white/[0.15] text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Sample Code: <strong className="text-orange-400 font-mono">4821</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtp('4821')}
                    className="text-xs text-orange-300 bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-500/30 hover:bg-orange-900/60"
                  >
                    Fill 4821
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
