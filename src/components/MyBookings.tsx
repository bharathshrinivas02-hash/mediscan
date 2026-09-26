import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, IndianRupee, ShieldCheck, ArrowRight } from 'lucide-react';
import { Booking } from '../types/mediscan';

interface MyBookingsProps {
  bookings: Booking[];
  onBookNew: () => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onBookNew }) => {
  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] my-8">
        <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(234,88,12,0.2)]">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white font-serif">No Scan Appointments Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Compare scan prices and waiting times across verified hospitals in Chennai & surrounding centres.
          Reserve your priority appointment with locked rates.
        </p>
        <div className="pt-2">
          <button
            onClick={onBookNew}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all"
          >
            Find & Compare Scans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-14 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white">Confirmed Scan Bookings</h2>
          <p className="text-xs text-slate-400">
            Locked price tokens and facility appointment records
          </p>
        </div>
        <button
          onClick={onBookNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white text-xs font-semibold transition-all"
        >
          <span>Book Another Scan</span>
          <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.bookingId}
            className="rounded-3xl p-5 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.4)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Token ID: {b.bookingId}
                  </span>
                  <h3 className="font-bold text-base text-white">{b.scanName}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  {b.status}
                </span>
                <span className="text-lg font-extrabold text-orange-400 font-mono">
                  ₹{b.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-2xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">
                  Hospital Facility
                </span>
                <strong className="text-white block">{b.hospitalName}</strong>
                <span className="text-slate-400">{b.branch}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-2xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">
                  Scheduled Slot
                </span>
                <strong className="text-white block">{b.date}</strong>
                <span className="text-orange-400 font-semibold">{b.timeSlot}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-2xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">
                  Patient & Wait Estimate
                </span>
                <strong className="text-white block">{b.patientName}</strong>
                <span className="text-amber-300 font-medium">{b.estimatedWait}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Guaranteed price lock honored by center. Show SMS or token ID at reception.
              </span>
              <span className="font-mono text-[11px] text-slate-500">Booked at {b.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
