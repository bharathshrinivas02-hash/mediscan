import { ScanTypeInfo, HospitalFacility, SimplifiedReport } from '../types/mediscan';

export const SCAN_TYPES: ScanTypeInfo[] = [
  {
    id: 'mri',
    name: 'MRI Scan',
    fullName: 'Magnetic Resonance Imaging',
    tamilName: 'எம்.ஆர்.ஐ ஸ்கேன் (MRI)',
    iconName: 'Activity',
    description: 'Detailed 3D pictures of brain, spine, joints, and soft organs using magnetic waves without radiation.',
    averagePriceRange: '₹3,500 – ₹7,500',
    durationMinutes: 30,
    preparationTip: 'Remove all metal jewelry, belts, and watches. Inform technician if you have any pacemaker or implants.'
  },
  {
    id: 'ecg',
    name: 'ECG / Echo',
    fullName: 'Electrocardiogram & Heart Echocardiography',
    tamilName: 'ஈசிஜி மற்றும் இதய பரிசோதனை (ECG)',
    iconName: 'HeartPulse',
    description: 'Quick check of heart rate, electrical rhythms, and heart muscle pumping efficiency.',
    averagePriceRange: '₹300 – ₹1,800',
    durationMinutes: 15,
    preparationTip: 'Wear a comfortable two-piece outfit. Avoid heavy caffeine 2 hours before the test.'
  },
  {
    id: 'xray',
    name: 'X-Ray',
    fullName: 'Digital Radiography (Chest & Bones)',
    tamilName: 'எக்ஸ்-ரே பரிசோதனை (X-Ray)',
    iconName: 'ScanLine',
    description: 'Fast check for bone fractures, lung infections, chest congestion, and dental joints.',
    averagePriceRange: '₹400 – ₹1,200',
    durationMinutes: 10,
    preparationTip: 'Wear loose clothing without metal zips or buttons over the scanned body area.'
  },
  {
    id: 'ct',
    name: 'CT Scan',
    fullName: 'Computed Tomography (CAT Scan)',
    tamilName: 'சி.டி ஸ்கேன் (CT Scan)',
    iconName: 'Layers',
    description: 'Fast cross-sectional X-ray slices for rapid trauma detection, chest scans, and abdominal organs.',
    averagePriceRange: '₹2,500 – ₹5,500',
    durationMinutes: 15,
    preparationTip: 'If contrast dye is required, 4 hours fasting and a recent kidney function (creatinine) report is recommended.'
  },
  {
    id: 'ultrasound',
    name: 'Ultrasound (USG)',
    fullName: 'High Frequency Soundwave Sonography',
    tamilName: 'அல்ட்ராசவுண்ட் ஸ்கேன் (USG)',
    iconName: 'Radio',
    description: 'Safe soundwave check for abdomen, liver, gallbladder, kidneys, and pregnancy monitoring.',
    averagePriceRange: '₹800 – ₹2,200',
    durationMinutes: 20,
    preparationTip: 'For pelvic and kidney scans, drink 3-4 glasses of water 1 hour prior to keep the bladder full.'
  },
  {
    id: 'pet',
    name: 'PET-CT Scan',
    fullName: 'Positron Emission Tomography',
    tamilName: 'பி.இ.டி ஸ்கேன் (PET-CT)',
    iconName: 'Zap',
    description: 'Advanced molecular scan to evaluate cellular metabolism, oncology staging, and deep tissue health.',
    averagePriceRange: '₹14,000 – ₹22,000',
    durationMinutes: 90,
    preparationTip: 'Requires strict 6 hours fasting and normal blood sugar level check prior to radiotracer injection.'
  }
];

export const POPULAR_LOCATIONS = [
  { city: 'Chennai', locality: 'Anna Nagar', label: 'Chennai — Anna Nagar' },
  { city: 'Chennai', locality: 'T. Nagar', label: 'Chennai — T. Nagar' },
  { city: 'Chennai', locality: 'Adyar / Guindy', label: 'Chennai — Adyar & Guindy' },
  { city: 'Chennai', locality: 'Velachery', label: 'Chennai — Velachery' },
  { city: 'Coimbatore', locality: 'Gandhipuram', label: 'Coimbatore — Gandhipuram' },
  { city: 'Madurai', locality: 'KK Nagar', label: 'Madurai — KK Nagar' },
  { city: 'Bangalore', locality: 'Koramangala', label: 'Bangalore — Koramangala' },
  { city: 'Bangalore', locality: 'Indiranagar', label: 'Bangalore — Indiranagar' }
];

export const HOSPITALS: HospitalFacility[] = [
  {
    id: 'hosp-a',
    name: 'Hospital A (Metro SuperSpeciality)',
    branch: 'Main Medical Campus',
    city: 'Chennai',
    locality: 'Anna Nagar',
    distanceKm: 2.1,
    rating: 4.8,
    reviewCount: 420,
    scanPrices: {
      mri: 5000,
      ecg: 800,
      xray: 750,
      ct: 4200,
      ultrasound: 1500,
      pet: 19500
    },
    waitingTimeHours: {
      mri: 1.0,
      ecg: 0.25,
      xray: 0.25,
      ct: 0.5,
      ultrasound: 0.5,
      pet: 2.0
    },
    waitingTimeDisplay: {
      mri: '⏱ 1-hour wait',
      ecg: '⏱ 15-min wait',
      xray: '⏱ 15-min wait',
      ct: '⏱ 30-min wait',
      ultrasound: '⏱ 30-min wait',
      pet: '⏱ 2-hour wait'
    },
    nabhAccredited: true,
    address: 'Plot 44, 2nd Avenue, Near Roundtana, Anna Nagar',
    phone: '+91 44 2621 8000',
    nextAvailableSlot: 'Today, 2:30 PM',
    features: ['3.0 Tesla Silent MRI', 'Zero Wait Express Bay', 'Air-Conditioned Lounge', 'Digital CD & Online PDF']
  },
  {
    id: 'hosp-b',
    name: 'Hospital B (Aarthi Community Diagnostics)',
    branch: 'Sub-Centre',
    city: 'Chennai',
    locality: 'Anna Nagar',
    distanceKm: 3.4,
    rating: 4.6,
    reviewCount: 890,
    scanPrices: {
      mri: 4000,
      ecg: 450,
      xray: 450,
      ct: 3200,
      ultrasound: 950,
      pet: 15500
    },
    waitingTimeHours: {
      mri: 2.0,
      ecg: 0.5,
      xray: 0.5,
      ct: 1.0,
      ultrasound: 1.0,
      pet: 3.0
    },
    waitingTimeDisplay: {
      mri: '⏱ 2-hour wait',
      ecg: '⏱ 30-min wait',
      xray: '⏱ 30-min wait',
      ct: '⏱ 1-hour wait',
      ultrasound: '⏱ 1-hour wait',
      pet: '⏱ 3-hour wait'
    },
    nabhAccredited: true,
    address: 'No. 12, 100 Feet Road, Next to Metro Station, Anna Nagar',
    phone: '+91 44 2626 5000',
    nextAvailableSlot: 'Today, 4:00 PM',
    features: ['Subsidized Community Rates', 'Senior Citizen Priority', 'Instant WhatsApp Report', 'Experienced Radiologists']
  },
  {
    id: 'hosp-c',
    name: 'Kauvery Imaging & Diagnostics',
    branch: 'Heart & Scan Care Centre',
    city: 'Chennai',
    locality: 'T. Nagar',
    distanceKm: 4.8,
    rating: 4.7,
    reviewCount: 310,
    scanPrices: {
      mri: 4600,
      ecg: 500,
      xray: 550,
      ct: 3600,
      ultrasound: 1100,
      pet: 17000
    },
    waitingTimeHours: {
      mri: 1.25,
      ecg: 0.3,
      xray: 0.3,
      ct: 0.75,
      ultrasound: 0.75,
      pet: 2.5
    },
    waitingTimeDisplay: {
      mri: '⏱ 1.25-hour wait',
      ecg: '⏱ 20-min wait',
      xray: '⏱ 20-min wait',
      ct: '⏱ 45-min wait',
      ultrasound: '⏱ 45-min wait',
      pet: '⏱ 2.5-hour wait'
    },
    nabhAccredited: true,
    address: '81, TTK Road & G.N. Chetty Road, T. Nagar',
    phone: '+91 44 4000 6000',
    nextAvailableSlot: 'Today, 3:15 PM',
    features: ['High-Field 1.5T MRI', 'Cardiologist On-Duty', 'Same-day Consultant Review']
  },
  {
    id: 'hosp-d',
    name: 'SIMS Diagnostic & Research Centre',
    branch: 'Advanced Radiology Wing',
    city: 'Chennai',
    locality: 'Adyar / Guindy',
    distanceKm: 6.2,
    rating: 4.9,
    reviewCount: 540,
    scanPrices: {
      mri: 5400,
      ecg: 900,
      xray: 800,
      ct: 4500,
      ultrasound: 1600,
      pet: 18500
    },
    waitingTimeHours: {
      mri: 0.75,
      ecg: 0.2,
      xray: 0.2,
      ct: 0.5,
      ultrasound: 0.5,
      pet: 1.5
    },
    waitingTimeDisplay: {
      mri: '⏱ 45-min wait',
      ecg: '⏱ 15-min wait',
      xray: '⏱ 15-min wait',
      ct: '⏱ 30-min wait',
      ultrasound: '⏱ 30-min wait',
      pet: '⏱ 1.5-hour wait'
    },
    nabhAccredited: true,
    address: 'Jawaharlal Nehru Salai, Near Kathipara, Guindy',
    phone: '+91 44 2000 1111',
    nextAvailableSlot: 'Today, 1:45 PM',
    features: ['Ultra-Fast 70cm Wide Bore', 'Zero Claustrophobia Setup', 'Emergency Scan Protocol']
  },
  {
    id: 'hosp-e',
    name: 'Bharat Scans & Lab Trust',
    branch: 'Public Diagnostic Wing',
    city: 'Chennai',
    locality: 'Velachery',
    distanceKm: 7.8,
    rating: 4.5,
    reviewCount: 620,
    scanPrices: {
      mri: 3800,
      ecg: 350,
      xray: 400,
      ct: 2900,
      ultrasound: 850,
      pet: 14900
    },
    waitingTimeHours: {
      mri: 2.5,
      ecg: 0.5,
      xray: 0.5,
      ct: 1.5,
      ultrasound: 1.2,
      pet: 3.5
    },
    waitingTimeDisplay: {
      mri: '⏱ 2.5-hour wait',
      ecg: '⏱ 30-min wait',
      xray: '⏱ 30-min wait',
      ct: '⏱ 1.5-hour wait',
      ultrasound: '⏱ 1.2-hour wait',
      pet: '⏱ 3.5-hour wait'
    },
    nabhAccredited: false,
    address: '15 Velachery Bypass Road, Near Phoenix Marketcity',
    phone: '+91 44 2244 8899',
    nextAvailableSlot: 'Today, 5:30 PM',
    features: ['Most Economical Rate', 'Open 24/7', 'Senior Citizen Free Pick/Drop in 3km']
  }
];

export const SAMPLE_REPORTS: SimplifiedReport[] = [
  {
    id: 'sample-mri-brain',
    scanType: 'MRI Brain (Plain & Contrast)',
    patientName: 'K. Ramanathan (54 / M)',
    reportDate: '24 Sep 2026',
    sourceType: 'sample',
    rawOcrText: `DEPARTMENT OF RADIODIAGNOSIS & NEURO-IMAGING
CLINICAL INDICATION: Chronic headaches, episodic dizziness, ruling out acute stroke.
TECHNIQUE: Multiplanar multi-echo T1, T2, FLAIR, DWI, ADC, and T2* GRE axial sequences.

FINDINGS:
1. Brain Parenchyma: Bilateral cerebral hemispheres demonstrate normal cortical thickness. No territorial acute or subacute infarct noted on DWI/ADC mapping. No signs of intracranial hemorrhage or midline shift.
2. White Matter: Mild punctate foci of T2/FLAIR hyperintensity in periventricular and subcortical white matter, Fazekas Grade 1, consistent with chronic microvascular ischemic changes secondary to age / mild hypertension.
3. Ventricles & Cisterns: Lateral ventricles are symmetrical, mildly prominent commensurate with age. Basal cisterns and Sylvian fissures are patent.
4. Cranial Nerves & Sella: Pituitary gland unremarkable. Major intracranial flow voids preserved.
5. Paranasal Sinuses: Minimal mucosal thickening in right maxillary antrum.

IMPRESSION:
- No acute intracranial catastrophe, acute infarction, or mass effect.
- Mild chronic microvascular ischemic white matter changes (Fazekas Grade 1).
- Correlate clinically with cardiovascular risk factors (BP, lipids).`,
    overallStatus: 'yellow',
    overallSummaryEn: 'Good news! Your brain scan shows no evidence of stroke, bleeding, or brain tumors. There are only very mild, small age-related changes in the tiny blood vessels, which are common in adults. Keep your blood pressure and sugar levels in healthy check.',
    overallSummaryTa: 'நல்ல செய்தி! உங்கள் மூளை ஸ்கேன் அறிக்கையில் பக்கவாதம் (Stroke), இரத்தக் கசிவு அல்லது கட்டிகள் எதுவும் இல்லை. உங்கள் வயதுக்குரிய மிகச் சிறிய, இயல்பான இரத்தக் குழாய் மாற்றங்கள் மட்டுமே காணப்படுகின்றன. உங்கள் இரத்த அழுத்தம் (BP) மற்றும் சர்க்கரை அளவை மருத்துவர் அறிவுரைப்படி சரியாக பராமரித்துக் கொள்ளுங்கள்.',
    voiceScriptEn: 'Hello. Here is the simple summary of your Brain MRI. There is no stroke, no tumor, and no bleeding. Your brain tissue is largely healthy. There are only slight, normal aging wear marks in small blood vessels. Continue your routine health checkups with your doctor.',
    voiceScriptTa: 'வணக்கம். உங்கள் மூளை எம்.ஆர்.ஐ ஸ்கேன் முடிவின் சுருக்கம்: பக்கவாதம், கட்டி அல்லது இரத்தக் கசிவு எதுவும் இல்லை. மூளையின் திசுக்கள் ஆரோக்கியமாக உள்ளன. இரத்த அழுத்தத்தை கட்டுப்பாட்டில் வைத்து உங்கள் மருத்துவரை வழக்கமான பரிசோதனைக்கு அணுகவும்.',
    keyFindings: [
      {
        title: 'Stroke & Brain Tissue (பக்கவாதம் & மூளை திசு)',
        titleTa: 'பக்கவாதம் & மூளை திசு',
        status: 'green',
        statusLabel: 'Normal',
        statusLabelTa: 'சாதாரணமானது',
        explanation: 'No sudden blood clots, no stroke damage, and no swelling. Brain tissue architecture is intact and healthy.',
        explanationTa: 'இரத்தக் கட்டிகளோ, பக்கவாத அறிகுறிகளோ அல்லது வீக்கமோ இல்லை. மூளை திசுக்கள் இயல்பாகவும் ஆரோக்கியமாகவும் உள்ளன.',
        doctorQuestion: 'Confirm that headaches are likely tension or eye-strain related rather than neural pathology.',
        doctorQuestionTa: 'தலைவலிக்கு கண் சோர்வு அல்லது மன அழுத்தம் காரணமா என்பதை மருத்துவரிடம் கேட்டு அறியலாம்.'
      },
      {
        title: 'Tiny Blood Vessel Health (நுண்ணிய இரத்தக் குழாய்கள்)',
        titleTa: 'நுண்ணிய இரத்தக் குழாய்கள் நிலை',
        status: 'yellow',
        statusLabel: 'Borderline',
        statusLabelTa: 'கவனிக்கப்பட வேண்டியது',
        explanation: 'Very mild wear-and-tear spots (Fazekas 1) seen in small vessels, usually caused by age or mild blood pressure fluctuations.',
        explanationTa: 'வயது மூப்பு அல்லது இரத்த அழுத்தம் காரணமாக மிக லேசான மாற்றங்கள் காணப்படுகின்றன. இது பொதுவானது, ஆபத்தானது அல்ல.',
        doctorQuestion: 'Ask if your current BP medication dosage needs any fine-tuning.',
        doctorQuestionTa: 'இரத்த அழுத்த மாத்திரைகளில் ஏதேனும் மாற்றம் தேவையா என மருத்துவரிடம் ஆலோசிக்கவும்.'
      },
      {
        title: 'Maxillary Sinuses (மூக்கு மற்றும் சைனஸ் துவாரங்கள்)',
        titleTa: 'சைனஸ் சளி அடைப்பு',
        status: 'green',
        statusLabel: 'Normal',
        statusLabelTa: 'சாதாரணமானது',
        explanation: 'Tiny mucosal thickening in the right sinus, which usually means mild seasonal cold or dust allergy.',
        explanationTa: 'வலது பக்க சைனஸ் பகுதியில் லேசான தடிமன் உள்ளது. இது பொதுவான பருவநிலை சளி அல்லது அலர்ஜியால் ஏற்படக்கூடியது.',
        doctorQuestion: 'Ask if simple steam inhalation or anti-allergy nasal spray is suggested.',
        doctorQuestionTa: 'ஆவி பிடித்தல் போதுமானதா என மருத்துவரிடம் கேட்கலாம்.'
      }
    ]
  },
  {
    id: 'sample-xray-chest',
    scanType: 'Chest X-Ray PA View',
    patientName: 'S. Revathi (42 / F)',
    reportDate: '25 Sep 2026',
    sourceType: 'sample',
    rawOcrText: `DEPARTMENT OF RADIOLOGY & IMAGING SCIENCES
CHEST PA PROJECTION

OBSERVATIONS:
- Trachea is central in position.
- Bilateral lung fields demonstrate clear expansion. No focal consolidation, cavitation, or active parenchymal lesion identified.
- Mild prominent broncho-vascular markings observed in both lower zones, suggestive of mild bronchial irritation / reactive airway.
- Costophrenic and cardiophrenic angles are sharp and clear bilaterally. No pleural effusion.
- Cardiac silhouette is normal in shape, size, and contour. Cardiothoracic ratio is < 50%.
- Bony thorax and visualized soft tissue contours appear intact with no osteolytic lesions.
- Both diaphragmatic domes are smooth and regular.

IMPRESSION:
- Mild bilateral lower zone broncho-vascular prominence, consistent with mild bronchitis or viral airway allergy.
- No active pulmonary tuberculosis or focal consolidation.
- Heart size within normal limits.`,
    overallStatus: 'green',
    overallSummaryEn: 'Your chest X-ray is mostly clear! Your heart size is completely normal and your lungs have no pneumonia, fluid buildup, or serious infection. There is just mild irritation in the lower breathing tubes, typical of a regular cough, dust allergy, or mild cold.',
    overallSummaryTa: 'உங்கள் மார்பு எக்ஸ்-ரே அறிக்கை மிகவும் திருப்திகரமாக உள்ளது! உங்கள் இதயத்தின் அளவு இயல்பாக உள்ளது. நுரையீரலில் நிமோனியா அல்லது தீவிர தொற்று எதுவும் இல்லை. சளி அல்லது தூசி அலர்ஜியால் மூச்சுக்குழாயில் மிக லேசான எரிச்சல் மட்டுமே உள்ளது.',
    voiceScriptEn: 'Your chest X-ray looks good. Your lungs are clear of pneumonia or major infection, and your heart size is perfectly normal. The mild bronchial marks only indicate a simple cough or seasonal allergy.',
    voiceScriptTa: 'உங்கள் மார்பு எக்ஸ்-ரே முடிவுகள் இயல்பாக உள்ளன. நுரையீரலில் நிமோனியா போன்ற தீவிர பாதிப்புகள் எதுவும் இல்லை. இதயம் இயல்பான அளவில் உள்ளது. லேசான சளி தொல்லைக்கான அறிகுறிகள் மட்டுமே உள்ளன.',
    keyFindings: [
      {
        title: 'Heart Size & Shape (இதயத்தின் அளவு)',
        titleTa: 'இதயத்தின் அளவு மற்றும் வடிவம்',
        status: 'green',
        statusLabel: 'Normal',
        statusLabelTa: 'சாதாரணமானது',
        explanation: 'Cardiothoracic ratio is normal (< 50%). The heart is not enlarged and is functioning within healthy boundaries.',
        explanationTa: 'இதயத்தின் அளவு மிகச் சரியாக உள்ளது. இதயம் பெரிதாகவில்லை, இயல்பான ஆரோக்கிய வரம்பிற்குள் உள்ளது.',
        doctorQuestion: 'Confirm that cardiovascular health requires no extra medication.',
        doctorQuestionTa: 'இதய ஆரோக்கியத்திற்கு கூடுதல் மருந்துகள் தேவையில்லை என்பதை உறுதிப்படுத்திக் கொள்ளலாம்.'
      },
      {
        title: 'Lungs & Pneumonia Check (நுரையீரல் தொற்று நிலை)',
        titleTa: 'நுரையீரல் & தொற்று சோதனை',
        status: 'green',
        statusLabel: 'Normal',
        statusLabelTa: 'சாதாரணமானது',
        explanation: 'No pneumonia patches, no TB lesions, and no fluid around the lungs (clear angles).',
        explanationTa: 'நுரையீரலில் நிமோனியா தழும்புகளோ, தீவிர தொற்றுகளோ அல்லது நீர் கோர்ப்போ இல்லை.',
        doctorQuestion: 'Ask what cough syrup or warm fluids are best for quick throat relief.',
        doctorQuestionTa: 'தொண்டை அல்லது சளிக்கு ஏற்ற சிரப் பரிந்துரைக்கக் கேட்கவும்.'
      },
      {
        title: 'Bronchial Airway Irritation (மூச்சுக்குழாய் எரிச்சல்)',
        titleTa: 'மூச்சுக்குழாய் லேசான பாதிப்பு',
        status: 'yellow',
        statusLabel: 'Borderline',
        statusLabelTa: 'கவனிக்கப்பட வேண்டியது',
        explanation: 'Slightly prominent bronchial markings in lower zones, often seen with ongoing viral cough, pollen exposure, or dust irritation.',
        explanationTa: 'கீழ் மூச்சுக்குழாய் பகுதிகளில் லேசான சளி அடையாளம் காணப்படுகிறது. இது சாதாரண தூசி அல்லது பருவகால சளியால் வருவது.',
        doctorQuestion: 'Ask if a short course of inhaler or antihistamine tablet is helpful.',
        doctorQuestionTa: 'அலர்ஜி மாத்திரை அல்லது ஆவி பிடித்தல் போதுமானதா என ஆலோசிக்கவும்.'
      }
    ]
  },
  {
    id: 'sample-ecg-cardiac',
    scanType: '12-Lead Electrocardiogram (ECG)',
    patientName: 'M. Selvaraj (61 / M)',
    reportDate: '26 Sep 2026',
    sourceType: 'sample',
    rawOcrText: `STANDARD 12-LEAD RESTING ECG
Ventricular Rate: 104 bpm (Tachycardia)
PR Interval: 158 ms
QRS Duration: 88 ms
QT / QTc Interval: 362 / 468 ms
P-R-T Axes: 42° / 58° / 66°

FINDINGS:
- Sinus tachycardia with heart rate 104 bpm. Regular rhythm.
- Normal P-wave morphology and PR interval.
- Normal QRS duration and transition in precordial leads (V1-V6). No pathological Q-waves.
- Nonspecific ST segment flattening with minor T-wave inversion in Lead III and aVF.
- Borderline prolonged QTc interval (468 ms).

INTERPRETATION:
- Sinus tachycardia (Fast pulse rate).
- Borderline inferior repolarization changes (ST-T changes in Lead III/aVF).
- Suggest clinical correlation with serum electrolytes, thyroid function, and 2D Echocardiogram if symptomatic.`,
    overallStatus: 'yellow',
    overallSummaryEn: 'Your ECG shows your heart is beating slightly fast (104 beats per minute), known as tachycardia. This is often caused by anxiety, mild dehydration, fever, or caffeine. There is also a mild, borderline wave pattern in the lower heart leads. Your doctor may check your electrolyte levels or advise a simple Echo scan to be completely safe.',
    overallSummaryTa: 'உங்கள் ஈசிஜி (ECG) அறிக்கையில் இதயத் துடிப்பு சற்று வேகமாக உள்ளது (நிமிடத்திற்கு 104 துடிப்புகள்). இது பயம், போதிய தண்ணீர் குடிக்காதது அல்லது காய்ச்சலால் ஏற்படலாம். கீழ் இதய அலைகளில் சிறிய மாறுதல் காணப்படுகிறது. மருத்துவரை நேரில் சந்தித்து கூடுதல் பரிசோதனை (Echo) தேவையா என ஆலோசிப்பது நல்லது.',
    voiceScriptEn: 'Your ECG indicates a fast heart rate of 104 beats per minute, which can happen due to stress, exertion, or fever. There is a borderline wave variation in the lower leads. Please share this report with your physician for a simple routine checkup.',
    voiceScriptTa: 'உங்கள் ஈசிஜி பரிசோதனையில் இதயத்துடிப்பு சற்று கூடுதலாக 104 ஆக உள்ளது. சிறிய அளவிலான அலை மாறுபாடுகள் உள்ளன. மருத்துவரின் நேரடி ஆலோசனையைப் பெற்று தகுந்த வழிமுறைகளை பின்பற்றுங்கள்.',
    keyFindings: [
      {
        title: 'Resting Heart Rate (இதயத் துடிப்பு வேகம்)',
        titleTa: 'இதயத் துடிப்பு வேகம்',
        status: 'yellow',
        statusLabel: 'Borderline',
        statusLabelTa: 'கவனிக்கப்பட வேண்டியது',
        explanation: 'Pulse is 104 bpm (normal resting is 60–100 bpm). Commonly accelerated by anxiety, coffee, dehydration, or stress.',
        explanationTa: 'துடிப்பு 104 ஆக உள்ளது (இயல்பானது 60-100). பதட்டம், காபி, நீர்ச்சத்து குறைவு போன்றவற்றால் வேகமடையலாம்.',
        doctorQuestion: 'Should we re-check pulse when fully relaxed and well hydrated?',
        doctorQuestionTa: 'ஓய்வாக இருக்கும்போது மீண்டும் துடிப்பை பரிசோதிக்க வேண்டுமா?'
      },
      {
        title: 'Heart Rhythm & Conduction (இதய துடிப்பு ஒழுங்குமுறை)',
        titleTa: 'இதய மின் அலை கடத்தல்',
        status: 'green',
        statusLabel: 'Normal',
        statusLabelTa: 'சாதாரணமானது',
        explanation: 'PR interval and QRS duration are normal. The electrical pathways transmitting heartbeats are intact.',
        explanationTa: 'இதயத்தின் மின் அலை சமிக்ஞைகள் சீராகவும் சரியான நேர இடைவெளியிலும் செயல்படுகின்றன.',
        doctorQuestion: 'Confirm that electrical pathways are steady and normal.',
        doctorQuestionTa: 'இதய சமிக்ஞை வழித்தடங்கள் சீராக உள்ளனவா என்பதை உறுதிப்படுத்தலாம்.'
      },
      {
        title: 'ST-T Wave Patterns (கீழ் இதய அலை மாற்றங்கள்)',
        titleTa: 'ST-T அலை மாறுபாடுகள்',
        status: 'yellow',
        statusLabel: 'Borderline',
        statusLabelTa: 'கவனிக்கப்பட வேண்டியது',
        explanation: 'Minor flattening in inferior leads (Lead III & aVF). Usually benign, but doctor might check electrolytes (potassium) or a 2D Echo.',
        explanationTa: 'கீழ் அலைகளில் சிறிய மாறுதல் உள்ளது. பொதுவாக பாதிப்பற்றது என்றாலும், பொட்டாசியம் சத்து மற்றும் எக்கோ பரிசோதனை செய்ய மருத்துவர் அறிவுறுத்தலாம்.',
        doctorQuestion: 'Ask if an Echocardiogram or blood potassium test is recommended.',
        doctorQuestionTa: 'எக்கோ (Echo) அல்லது பொட்டாசியம் இரத்தப் பரிசோதனை தேவையா என கேட்கவும்.'
      }
    ]
  }
];
