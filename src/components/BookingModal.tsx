import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, ShieldCheck, IndianRupee } from 'lucide-react';
import { HospitalFacility, ScanTypeInfo, Booking } from '../types/mediscan';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: HospitalFacility | null;
  scan: ScanTypeInfo;
  userPhone: string | null;
  onConfirmBooking: (booking: Booking) => void;
  onOpenAuth: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  hospital,
  scan,
  userPhone,
  onConfirmBooking,
  onOpenAuth,
}) => {
  const [patientName, setPatientName] = useState('Ramesh Kumar');
  const [phone, setPhone] = useState(userPhone || '98401 23456');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen || !hospital) return null;

  const price = hospital.scanPrices[scan.id];
  const waitDisplay = hospital.waitingTimeDisplay[scan.id];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone) {
      onOpenAuth();
      return;
    }

    const newBooking: Booking = {
      bookingId: `MDS-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName: patientName.trim() || 'Patient',
      phone: phone,
      hospitalName: hospital.name,
      branch: hospital.branch,
      scanName: scan.name,
      scanCategory: scan.id,
      date: selectedDate === 'Today' ? 'Today (26 Sep 2026)' : selectedDate,
      timeSlot: selectedSlot,
      price: price,
      estimatedWait: waitDisplay,
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConfirmedBooking(newBooking);
    onConfirmBooking(newBooking);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="rounded-3xl max-w-lg w-full bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/[0.15] shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="p-6 text-white border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold bg-orange-950/60 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
              Priority Slot Reservation
            </span>
            <h3 className="text-xl font-bold font-serif text-white mt-1.5">{scan.name} Appointment</h3>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess && confirmedBooking ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-300 text-xs font-mono font-semibold border border-emerald-500/30 mb-1.5">
                Token ID: {confirmedBooking.bookingId}
              </span>
              <h4 className="text-xl font-bold text-white">Scan Slot Confirmed</h4>
              <p className="text-xs text-slate-400 mt-1">
                Your priority appointment and guaranteed price lock are saved.
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.08] text-left space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Center:</span>
                <span className="font-semibold text-white text-right">{hospital.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Address:</span>
                <span className="font-medium text-slate-300 text-right">{hospital.address}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Scheduled Time:</span>
                <span className="font-semibold text-orange-400">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Locked Price:</span>
                <span className="font-bold text-white text-sm font-mono">₹{confirmedBooking.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Wait:</span>
                <span className="font-semibold text-amber-300">{confirmedBooking.estimatedWait}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-semibold text-sm transition-all"
            >
              Done & View Bookings
            </button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="p-6 space-y-4">
            {/* Center Summary */}
            <div className="rounded-2xl p-3.5 bg-white/[0.03] border border-white/[0.08] flex items-start justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{hospital.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {hospital.locality}, {hospital.city} ({hospital.distanceKm} km away)
                </p>
                <p className="text-xs text-amber-300 font-medium flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {waitDisplay}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Fee</span>
                <span className="text-lg font-extrabold text-orange-400 font-mono">
                  ₹{price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Patient Full Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3.5 py-2.5 text-sm bg-white/[0.03] border border-white/[0.12] rounded-xl text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Date selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Day
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'Day After'].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      selectedDate === d
                        ? 'border-orange-500 bg-orange-600/30 text-white shadow-[0_0_12px_rgba(234,88,12,0.3)]'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Available Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'].map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      selectedSlot === slot
                        ? 'border-orange-500 bg-orange-600/30 text-white shadow-[0_0_12px_rgba(234,88,12,0.3)]'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Preparation Tip */}
            <div className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.08] text-xs text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Preparation advice:</span> {scan.preparationTip}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Confirm Priority Scan Slot</span>
              <span className="font-bold font-mono">₹{price.toLocaleString('en-IN')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
