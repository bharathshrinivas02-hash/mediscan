import React from 'react';
import { Stethoscope, FileText, CalendarCheck, HelpCircle, Phone, UserCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scans' | 'report' | 'bookings' | 'about';
  setActiveTab: (tab: 'scans' | 'report' | 'bookings' | 'about') => void;
  userPhone: string | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userPhone,
  onOpenAuth,
  onLogout,
  bookingCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('scans')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 p-[1px] shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.6)] transition-all">
              <div className="w-full h-full bg-[#0d121f] rounded-2xl flex items-center justify-center text-orange-400 group-hover:text-orange-300 transition-colors">
                <Stethoscope className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-white font-serif bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  MEDISCAN
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase shadow-[0_0_10px_rgba(234,88,12,0.2)]">
                  Affordable & Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Making Medical Scans Accessible & Affordable
              </p>
            </div>
          </div>

          {/* Navigation Links in Frosted Glass Container */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <button
              onClick={() => setActiveTab('scans')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'scans'
                  ? 'bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white shadow-[0_4px_16px_rgba(234,88,12,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-orange-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-orange-400" />
              <span>Find & Compare Scans</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white shadow-[0_4px_16px_rgba(234,88,12,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-orange-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Simplify Medical Report</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'bookings'
                  ? 'bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white shadow-[0_4px_16px_rgba(234,88,12,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-orange-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] flex items-center justify-center font-bold">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
                activeTab === 'about'
                  ? 'bg-white/[0.08] text-white border border-white/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why MEDISCAN</span>
            </button>
          </nav>

          {/* User Auth: Mobile Number + OTP in Frosted Pill */}
          <div className="flex items-center gap-2">
            {userPhone ? (
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 pl-3 pr-2 py-1.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono">{userPhone}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-[11px] text-slate-400 hover:text-red-400 ml-1 font-medium transition-colors"
                  title="Sign out"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 border border-white/20 shadow-[0_0_20px_rgba(234,88,12,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-orange-200" />
                <span>Mobile Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto gap-1.5 py-2.5 border-t border-white/[0.06] no-scrollbar">
          <button
            onClick={() => setActiveTab('scans')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === 'scans' 
                ? 'bg-orange-600 text-white border border-orange-400/40' 
                : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Compare Scans</span>
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === 'report' 
                ? 'bg-orange-600 text-white border border-orange-400/40' 
                : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Simplify Report</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === 'bookings' 
                ? 'bg-orange-600 text-white border border-orange-400/40' 
                : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Bookings ({bookingCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === 'about' 
                ? 'bg-orange-600 text-white border border-orange-400/40' 
                : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why MEDISCAN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
