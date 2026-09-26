import React from 'react';
import { 
  Hourglass, 
  Banknote, 
  FileWarning, 
  Smartphone, 
  Scan, 
  MapPin, 
  CheckCircle2, 
  Volume2, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  Scale
} from 'lucide-react';

interface AboutMediscanProps {
  onStartSearch: () => void;
  onStartReport: () => void;
}

export const AboutMediscan: React.FC<AboutMediscanProps> = ({
  onStartSearch,
  onStartReport
}) => {
  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-4 pt-4 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
          MEDISCAN
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
          Making Medical Scans Accessible & Affordable
        </p>
      </div>

      {/* The Healthcare Dilemmas Solved */}
      <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white">The Dilemmas in Medical Scans</h2>
          <p className="text-xs text-slate-400 mt-1">Why getting a diagnostic scan is traditionally frustrating</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Problem 1 */}
          <div className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Hourglass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Time-Consuming Search</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Finding the right hospital for medical scans is time-consuming with no single source of truth.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">No Cost Comparison</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No easy way to compare scan costs and waiting times across facilities.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
              <FileWarning className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Complex Reports</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Medical reports are complex and hard to understand for everyday patients.
            </p>
          </div>
        </div>
      </div>

      {/* The Unified Platform Solution */}
      <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white">The MEDISCAN Workflow</h2>
          <p className="text-xs text-slate-400 mt-1">Seamless booking and verified pricing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs font-mono">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Log In</h4>
            <p className="text-xs text-slate-400">
              Sign in using your mobile number + OTP — quick and secure.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs font-mono">
              <Scan className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Select Your Scan</h4>
            <p className="text-xs text-slate-400">
              Choose the required scan type: MRI, ECG, X-ray, and more.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs font-mono">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Share Location</h4>
            <p className="text-xs text-slate-400">
              Provide or select your location to find nearby centres.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs font-mono">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Get Results</h4>
            <p className="text-xs text-slate-400">
              See a list of nearby hospitals with ratings, cost, and waiting time.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onStartSearch}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all active:scale-95"
          >
            <span>Launch Scan Comparator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two Technological Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">OCR Accuracy Pipeline</h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="bg-white/[0.02] border border-white/[0.08] p-3 rounded-xl">
              <strong className="text-rose-400 block mb-1">Source Quality Challenge:</strong>
              Medical reports are often handwritten or low-quality scans, making automated text extraction unreliable.
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 space-y-1.5">
              <strong className="text-emerald-200 block">Our Solution:</strong>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tesseract OCR + Image Pre-processing pipeline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Noise removal & contrast boost to clean up source images</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Users can manually edit extracted text for full accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Understanding for Everyone</h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="bg-white/[0.02] border border-white/[0.08] p-3 rounded-xl">
              <p className="text-amber-300">
                Medical terminology is complex for general users — MEDISCAN bridges that gap.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="border border-white/[0.08] bg-white/[0.02] p-2.5 rounded-xl">
                <strong className="text-white block">Simple Language</strong>
                <p className="text-[11px] text-slate-400 mt-1">
                  Reports translated to Simple English + Tamil so every user understands.
                </p>
              </div>

              <div className="border border-white/[0.08] bg-white/[0.02] p-2.5 rounded-xl">
                <strong className="text-white block">Color-Coded</strong>
                <p className="text-[11px] text-slate-400 mt-1">
                  Green = Normal | Yellow = Borderline | Red = Abnormal
                </p>
              </div>

              <div className="border border-white/[0.08] bg-white/[0.02] p-2.5 rounded-xl">
                <strong className="text-white block">Voice Narration</strong>
                <p className="text-[11px] text-slate-400 mt-1">
                  Audio playback for users with low literacy or visual impairments.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onStartReport}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Report Simplifier</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="rounded-3xl p-8 sm:p-12 text-center space-y-4 bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-orange-600/10 backdrop-blur-2xl border border-orange-500/30 shadow-[0_20px_60px_rgba(234,88,12,0.2)]">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">Making Scans Accessible</h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-medium">
          MEDISCAN — Making Medical Scans Accessible & Affordable for everyone.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={onStartSearch}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all active:scale-95"
          >
            Find Nearby Scans
          </button>
          <button
            onClick={onStartReport}
            className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white font-bold text-sm transition-all"
          >
            Simplify a Medical Scan
          </button>
        </div>
      </div>
    </div>
  );
};
