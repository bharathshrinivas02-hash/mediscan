export type ScanCategory = 'mri' | 'ecg' | 'xray' | 'ct' | 'ultrasound' | 'pet';

export interface ScanTypeInfo {
  id: ScanCategory;
  name: string;
  fullName: string;
  tamilName: string;
  iconName: string;
  description: string;
  averagePriceRange: string;
  durationMinutes: number;
  preparationTip: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  branch: string;
  city: string;
  locality: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  scanPrices: Record<ScanCategory, number>;
  waitingTimeHours: Record<ScanCategory, number>;
  waitingTimeDisplay: Record<ScanCategory, string>;
  nabhAccredited: boolean;
  address: string;
  phone: string;
  nextAvailableSlot: string;
  features: string[];
}

export interface Booking {
  bookingId: string;
  patientName: string;
  phone: string;
  hospitalName: string;
  branch: string;
  scanName: string;
  scanCategory: ScanCategory;
  date: string;
  timeSlot: string;
  price: number;
  estimatedWait: string;
  status: 'Confirmed' | 'Completed';
  createdAt: string;
}

export type FindingStatus = 'green' | 'yellow' | 'red';

export interface KeyFinding {
  title: string;
  titleTa?: string;
  status: FindingStatus;
  statusLabel: string;
  statusLabelTa: string;
  explanation: string;
  explanationTa: string;
  doctorQuestion: string;
  doctorQuestionTa: string;
}

export interface SimplifiedReport {
  id: string;
  scanType: string;
  patientName: string;
  reportDate: string;
  rawOcrText: string;
  overallStatus: FindingStatus;
  overallSummaryEn: string;
  overallSummaryTa: string;
  keyFindings: KeyFinding[];
  voiceScriptEn: string;
  voiceScriptTa: string;
  preprocessedImageUrl?: string;
  sourceType: 'sample' | 'custom';
}

export interface ImageFilterOptions {
  noiseRemoval: boolean;
  contrastBoost: number; // 100 - 200
  brightness: number; // 90 - 140
  binarize: boolean;
  sharpness: boolean;
}
