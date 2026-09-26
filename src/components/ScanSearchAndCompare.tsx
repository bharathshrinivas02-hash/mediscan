import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowUpDown, 
  Clock, 
  IndianRupee, 
  Star, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Navigation,
  Scale,
  Zap,
  TrendingDown
} from 'lucide-react';
import { SCAN_TYPES, HOSPITALS, POPULAR_LOCATIONS } from '../data/mockData';
import { ScanTypeInfo, HospitalFacility, ScanCategory } from '../types/mediscan';

interface ScanSearchAndCompareProps {
  onSelectHospitalForBooking: (hospital: HospitalFacility, scan: ScanTypeInfo) => void;
  userPhone: string | null;
  onOpenAuth: () => void;
}

export const ScanSearchAndCompare: React.FC<ScanSearchAndCompareProps> = ({
  onSelectHospitalForBooking,
  userPhone,
  onOpenAuth
}) => {
  // Scan selection
  const [selectedScanId, setSelectedScanId] = useState<ScanCategory>('mri');
  
  // Location selection
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [selectedLocality, setSelectedLocality] = useState('Anna Nagar');
  const [isLocating, setIsLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<'cost-low' | 'wait-low' | 'rating-high' | 'distance-low'>('cost-low');

  // Interactive Comparator selection
  const [compareHospAId, setCompareHospAId] = useState<string>('hosp-a');
  const [compareHospBId, setCompareHospBId] = useState<string>('hosp-b');

  const selectedScan = useMemo(() => {
    return SCAN_TYPES.find((s) => s.id === selectedScanId) || SCAN_TYPES[0];
  }, [selectedScanId]);

  // GPS auto location
  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setLocationDetected(true);
          setSelectedCity('Chennai');
          setSelectedLocality('Anna Nagar (GPS Detected)');
        },
        () => {
          setIsLocating(false);
          setLocationDetected(true);
          setSelectedCity('Chennai');
          setSelectedLocality('Anna Nagar (Auto Selected)');
        },
        { timeout: 4000 }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        setLocationDetected(true);
      }, 500);
    }
  };

  // Filtered & Sorted list
  const sortedHospitals = useMemo(() => {
    const list = [...HOSPITALS];
    list.sort((a, b) => {
      if (sortBy === 'cost-low') {
        return a.scanPrices[selectedScanId] - b.scanPrices[selectedScanId];
      }
      if (sortBy === 'wait-low') {
        return a.waitingTimeHours[selectedScanId] - b.waitingTimeHours[selectedScanId];
      }
      if (sortBy === 'rating-high') {
        return b.rating - a.rating;
      }
      return a.distanceKm - b.distanceKm;
    });
    return list;
  }, [selectedScanId, sortBy]);

  // Compare facilities
  const hospA = HOSPITALS.find((h) => h.id === compareHospAId) || HOSPITALS[0];
  const hospB = HOSPITALS.find((h) => h.id === compareHospBId) || HOSPITALS[1];

  const priceA = hospA.scanPrices[selectedScanId];
  const priceB = hospB.scanPrices[selectedScanId];
  const priceDiff = Math.abs(priceA - priceB);

  return (
    <div className="space-y-8 pb-14">
      {/* Hero Glass Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
        {/* Glow ambient orbs */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute left-1/4 -bottom-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(234,88,12,0.15)]">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>Instant Cost & Waiting Time Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Compare Medical Scans Nearby & Save Up to 40%
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Finding verified diagnostics shouldn't take hours of phone calls. Compare certified imaging
            centres in real-time, evaluate trade-offs between speed and cost, and book your priority appointment slot.
          </p>
        </div>
      </div>

      {/* Scan Selection Panel (Liquid Glass) */}
      <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Select Scan Type
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                MRI, ECG, X-Ray, CT, Ultrasound, and PET-CT
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-orange-400 bg-orange-950/40 border border-orange-500/30 px-3 py-1 rounded-full">
              Standardized Diagnostic Codes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SCAN_TYPES.map((scan) => {
              const isSelected = selectedScanId === scan.id;
              return (
                <button
                  key={scan.id}
                  onClick={() => setSelectedScanId(scan.id)}
                  className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-orange-500/20 to-amber-600/10 border-2 border-orange-500/80 shadow-[0_0_25px_rgba(234,88,12,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white group-hover:text-orange-200 transition-colors">
                      {scan.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{scan.tamilName}</p>
                  <p className="text-[11px] font-semibold text-orange-400 mt-2 font-mono">
                    Avg {scan.averagePriceRange}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Quick scan info banner */}
          <div className="mt-3.5 text-xs bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
            <div>
              <strong className="text-white">{selectedScan.fullName}:</strong>{' '}
              <span className="text-slate-400">{selectedScan.description}</span>
            </div>
            <span className="font-mono text-amber-300 text-xs whitespace-nowrap bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start sm:self-auto">
              ⏱ Approx {selectedScan.durationMinutes} mins
            </span>
          </div>
        </div>

        {/* Location Selector (Liquid Glass) */}
        <div className="pt-5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Location & Coverage Area
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pinpoint nearby certified imaging centres and hospitals
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            {/* GPS Share Location Button */}
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                locationDetected
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-orange-300 hover:border-orange-500/30'
              }`}
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin text-orange-400' : ''}`} />
              <span>
                {isLocating
                  ? 'Detecting Location...'
                  : locationDetected
                  ? 'Location Detected (GPS Active)'
                  : 'Use Current Location (GPS)'}
              </span>
            </button>

            {/* Popular localities chips */}
            <div className="flex-1 flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> Popular:
              </span>
              {POPULAR_LOCATIONS.map((loc) => {
                const isSelected =
                  selectedCity === loc.city && selectedLocality.includes(loc.locality);
                return (
                  <button
                    key={loc.label}
                    onClick={() => {
                      setSelectedCity(loc.city);
                      setSelectedLocality(loc.locality);
                      setLocationDetected(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)] border border-orange-400/40'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 border border-white/[0.06]'
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* COMPARE & CHOOSE HERO (Liquid Glass Side-by-Side Trade-off Comparator) */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500/20 text-orange-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
                Direct Trade-Off Comparator
              </span>
              <span className="text-xs text-slate-400 font-medium">Cost vs. Speed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Compare & Choose
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Make informed decisions based on your priorities — cost, convenience, or speed.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/[0.04] px-3.5 py-2 rounded-xl border border-white/10">
            <Scale className="w-4 h-4 text-orange-400" />
            <span>Side-by-Side Choice</span>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card A: Hospital A (₹5,000 / 1-hour wait) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-orange-950/20 backdrop-blur-xl border border-white/[0.15] shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold bg-orange-950/50 px-2 py-0.5 rounded border border-orange-500/30">
                    Shorter Wait Option
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1.5">
                    {hospA.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {hospA.locality} ({hospA.distanceKm} km away)
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white/[0.08] border border-white/10 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hospA.rating}</span>
                </div>
              </div>

              {/* Big Price Display */}
              <div className="pt-2">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif text-white font-mono">
                  ₹{priceA.toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                  {selectedScan.name}
                </div>
              </div>

              {/* Wait time with stopwatch */}
              <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-3.5 py-2 rounded-xl text-sm font-semibold text-orange-200">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{hospA.waitingTimeDisplay[selectedScanId]}</span>
              </div>
            </div>

            <div className="pt-6 mt-5 border-t border-white/[0.08] flex items-center justify-between relative z-10">
              <span className="text-xs text-slate-400">Speed prioritized</span>
              <button
                onClick={() => onSelectHospitalForBooking(hospA, selectedScan)}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 shadow-[0_0_20px_rgba(234,88,12,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                Choose Hospital A
              </button>
            </div>
          </div>

          {/* Card B: Hospital B (₹4,000 / 2-hour wait) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-emerald-950/20 backdrop-blur-xl border border-white/[0.15] shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                    Lower Cost Option
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1.5">
                    {hospB.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {hospB.locality} ({hospB.distanceKm} km away)
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white/[0.08] border border-white/10 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hospB.rating}</span>
                </div>
              </div>

              {/* Big Price Display */}
              <div className="pt-2">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif text-white font-mono">
                  ₹{priceB.toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                  {selectedScan.name}
                </div>
              </div>

              {/* Wait time with stopwatch */}
              <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-3.5 py-2 rounded-xl text-sm font-semibold text-emerald-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{hospB.waitingTimeDisplay[selectedScanId]}</span>
              </div>
            </div>

            <div className="pt-6 mt-5 border-t border-white/[0.08] flex items-center justify-between relative z-10">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> Save ₹{priceDiff.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => onSelectHospitalForBooking(hospB, selectedScan)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                Choose Hospital B
              </button>
            </div>
          </div>
        </div>

        {/* Trade-off summary banner */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/25 flex items-start gap-3.5 text-slate-200">
          <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500/40 text-orange-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(234,88,12,0.3)] mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-200">
              {priceA > priceB ? (
                <>
                  <strong className="font-bold text-emerald-400">
                    Save ₹{priceDiff.toLocaleString('en-IN')}
                  </strong>{' '}
                  by choosing <span className="font-semibold text-white">{hospB.name}</span> — or pay a premium of{' '}
                  <strong className="font-bold text-orange-300">₹{priceDiff.toLocaleString('en-IN')}</strong> at{' '}
                  <span className="font-semibold text-white">{hospA.name}</span> for a shorter{' '}
                  <strong className="font-bold text-white">{hospA.waitingTimeDisplay[selectedScanId]}</strong>.{' '}
                  <span className="font-bold text-amber-300">You decide.</span>
                </>
              ) : priceB > priceA ? (
                <>
                  <strong className="font-bold text-emerald-400">
                    Save ₹{priceDiff.toLocaleString('en-IN')}
                  </strong>{' '}
                  by choosing <span className="font-semibold text-white">{hospA.name}</span> — or choose{' '}
                  <span className="font-semibold text-white">{hospB.name}</span>.{' '}
                  <span className="font-bold text-amber-300">You decide.</span>
                </>
              ) : (
                <>
                  Both facilities offer this scan at the rate of{' '}
                  <strong className="font-bold text-white">₹{priceA.toLocaleString('en-IN')}</strong>. Compare based on
                  waiting time or convenience!
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* All Verified Diagnostic Centres */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              Verified Scan Centres ({sortedHospitals.length} Facilities)
            </h2>
            <p className="text-xs text-slate-400">
              Transparent diagnostic fees with guaranteed locked appointment slots
            </p>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-white/[0.04] text-slate-200 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="cost-low" className="bg-slate-900 text-white">Lowest Cost First</option>
              <option value="wait-low" className="bg-slate-900 text-white">Shortest Waiting Time</option>
              <option value="rating-high" className="bg-slate-900 text-white">Highest Patient Rating</option>
              <option value="distance-low" className="bg-slate-900 text-white">Nearest Distance</option>
            </select>
          </div>
        </div>

        {/* Center Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedHospitals.map((hosp) => {
            const price = hosp.scanPrices[selectedScanId];
            const waitDisplay = hosp.waitingTimeDisplay[selectedScanId];

            return (
              <div
                key={hosp.id}
                className="rounded-3xl p-5 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {hosp.nabhAccredited && (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> NABH Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hosp.rating}</span>
                      <span className="text-slate-500 text-[10px]">({hosp.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white font-serif group-hover:text-orange-300 transition-colors">
                    {hosp.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {hosp.locality}, {hosp.city} · {hosp.distanceKm} km
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 space-y-2 py-2.5 border-y border-white/[0.06] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Verified Fee:</span>
                      <span className="text-lg font-extrabold text-orange-400 font-mono">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Typical Wait:</span>
                      <span className="font-semibold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                        {waitDisplay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Available:</span>
                      <span className="font-medium text-emerald-400">{hosp.nextAvailableSlot}</span>
                    </div>
                  </div>

                  {/* Feature tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {hosp.features.slice(0, 2).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-300 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCompareHospBId(hosp.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 text-xs font-semibold text-center transition-all"
                  >
                    Compare
                  </button>

                  <button
                    onClick={() => onSelectHospitalForBooking(hosp, selectedScan)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(234,88,12,0.3)] flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <span>Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
