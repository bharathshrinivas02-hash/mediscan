/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { ScanSearchAndCompare } from './components/ScanSearchAndCompare';
import { ReportSimplifier } from './components/ReportSimplifier';
import { MyBookings } from './components/MyBookings';
import { AboutMediscan } from './components/AboutMediscan';
import { HospitalFacility, ScanTypeInfo, Booking } from './types/mediscan';
import { SCAN_TYPES, HOSPITALS } from './data/mockData';
import { ShieldCheck, Stethoscope } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scans' | 'report' | 'bookings' | 'about'>('scans');
  
  // Auth state
  const [userPhone, setUserPhone] = useState<string | null>('+91 98401 23456');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Booking state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalFacility | null>(HOSPITALS[1]);
  const [selectedScan, setSelectedScan] = useState<ScanTypeInfo>(SCAN_TYPES[0]);

  // Initial booking
  const [bookings, setBookings] = useState<Booking[]>([
    {
      bookingId: 'MDS-482910',
      patientName: 'K. Ramanathan',
      phone: '+91 98401 23456',
      hospitalName: 'Hospital B (Aarthi Community Diagnostics)',
      branch: 'Anna Nagar Sub-Centre',
      scanName: 'MRI Scan',
      scanCategory: 'mri',
      date: 'Today (26 Sep 2026)',
      timeSlot: '04:00 PM',
      price: 4000,
      estimatedWait: '⏱ 2-hour wait',
      status: 'Confirmed',
      createdAt: '08:15 AM'
    }
  ]);

  const handleOpenBooking = (hospital: HospitalFacility, scan: ScanTypeInfo) => {
    setSelectedHospital(hospital);
    setSelectedScan(scan);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100 font-sans antialiased relative overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
      {/* Background Liquid Glass Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[600px] h-[600px] bg-amber-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userPhone={userPhone}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUserPhone(null)}
        bookingCount={bookings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-10">
        {activeTab === 'scans' && (
          <ScanSearchAndCompare
            onSelectHospitalForBooking={handleOpenBooking}
            userPhone={userPhone}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'report' && <ReportSimplifier />}

        {activeTab === 'bookings' && (
          <MyBookings
            bookings={bookings}
            onBookNew={() => setActiveTab('scans')}
          />
        )}

        {activeTab === 'about' && (
          <AboutMediscan
            onStartSearch={() => setActiveTab('scans')}
            onStartReport={() => setActiveTab('report')}
          />
        )}
      </main>

      {/* Sleek Frosted Glass Footer */}
      <footer className="mt-auto border-t border-white/[0.08] bg-[#070a12]/80 backdrop-blur-2xl py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold text-xs font-serif shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                M
              </div>
              <span className="font-bold text-white font-serif tracking-tight text-lg">MEDISCAN</span>
              <span className="text-slate-600 text-xs">·</span>
              <span className="text-xs text-slate-400">
                Making Medical Scans Accessible & Affordable
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <button
                onClick={() => setActiveTab('scans')}
                className="hover:text-orange-400 transition-colors"
              >
                Find & Compare Scans
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('report')}
                className="hover:text-orange-400 transition-colors"
              >
                Medical Report Simplifier
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-orange-400 transition-colors"
              >
                Why MEDISCAN
              </button>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent diagnostic scan rates with verified lab accreditation.</span>
            </div>
            <span>Built for high readability, low literacy accessibility, and instant comparisons.</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(phone) => setUserPhone(phone)}
      />

      {/* Booking Slot Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        hospital={selectedHospital}
        scan={selectedScan}
        userPhone={userPhone}
        onConfirmBooking={handleConfirmBooking}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}
