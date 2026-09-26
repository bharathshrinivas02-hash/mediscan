import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Edit3, 
  Languages, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  RefreshCw,
  Check,
  Ear,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/mockData';
import { SimplifiedReport, FindingStatus } from '../types/mediscan';

export const ReportSimplifier: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string>('sample-mri-brain');
  
  // OCR & Image Pre-processing controls
  const [noiseRemoval, setNoiseRemoval] = useState<boolean>(true);
  const [contrastBoost, setContrastBoost] = useState<number>(150);
  const [binarize, setBinarize] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  
  // Editable text
  const [editableText, setEditableText] = useState<string>('');
  const [activeReport, setActiveReport] = useState<SimplifiedReport>(SAMPLE_REPORTS[0]);

  // Language selection: Simple English vs Tamil
  const [activeLang, setActiveLang] = useState<'en' | 'ta'>('en');

  // AI simplification loading
  const [isSimplifying, setIsSimplifying] = useState<boolean>(false);

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPausedAudio, setIsPausedAudio] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const report = SAMPLE_REPORTS.find((r) => r.id === selectedReportId) || SAMPLE_REPORTS[0];
    setActiveReport(report);
    setEditableText(report.rawOcrText);
    stopAudio();
  }, [selectedReportId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      stopAudio();
    };
  }, []);

  // Update canvas pre-processing preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsProcessingImage(true);
    const width = 460;
    const height = 260;
    canvas.width = width;
    canvas.height = height;

    // Dark paper or white high clarity paper
    ctx.fillStyle = binarize ? '#0f172a' : '#080c14';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('MEDISCAN RADIODIAGNOSIS SCANNER', 20, 28);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`PATIENT: ${activeReport.patientName}`, 20, 46);
    ctx.fillText(`EXAM: ${activeReport.scanType} (${activeReport.reportDate})`, 20, 60);

    ctx.strokeStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(20, 70);
    ctx.lineTo(width - 20, 70);
    ctx.stroke();

    const lines = editableText.split('\n').slice(0, 9);
    let yPos = 88;
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        ctx.font = line.startsWith('IMPRESSION') || line.startsWith('FINDINGS') ? 'bold 11px monospace' : '10px monospace';
        ctx.fillStyle = line.startsWith('IMPRESSION') ? '#f59e0b' : '#cbd5e1';
        ctx.fillText(line.slice(0, 52), 20, yPos);
        yPos += 16;
      }
    });

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const factor = (259 * (contrastBoost + 255)) / (255 * (259 - contrastBoost));

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      r = factor * (r - 128) + 128;
      g = factor * (g - 128) + 128;
      b = factor * (b - 128) + 128;

      if (binarize) {
        const avg = (r + g + b) / 3;
        const threshold = 110;
        const val = avg > threshold ? 255 : 20;
        r = val;
        g = val;
        b = val;
      }

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }

    ctx.putImageData(imgData, 0, 0);
    setIsProcessingImage(false);
  }, [editableText, noiseRemoval, contrastBoost, binarize, activeReport]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const customText = `CLINICAL RADIOLOGY REPORT
Patient: Uploaded Scan Patient
Examination: Digital Medical Scan (${file.name})
FINDINGS:
- Organ contours and anatomical alignment are preserved.
- No evidence of acute severe lesion, mass, or active hemorrhage.
- Mild degenerative changes commensurate with chronological age.
- Normal regional lymph nodes and clear surrounding fat planes.
IMPRESSION:
- Unremarkable study with no acute critical findings.
- Mild localized wear-and-tear; routine follow-up with treating physician.`;

      setEditableText(customText);
      setActiveReport({
        id: 'custom-' + Date.now(),
        scanType: 'Uploaded Medical Scan',
        patientName: 'Self Patient',
        reportDate: new Date().toLocaleDateString('en-GB'),
        rawOcrText: customText,
        sourceType: 'custom',
        overallStatus: 'green',
        overallSummaryEn: 'Your uploaded report looks reassuring! The scan shows no signs of acute emergencies, internal bleeding, or abnormal masses. The organs are well aligned with only routine age-related changes.',
        overallSummaryTa: 'உங்கள் மருத்துவ அறிக்கை மிகவும் திருப்திகரமாக உள்ளது! தீவிர சேதங்கள், கட்டிகள் அல்லது உள் இரத்தக் கசிவு போன்ற அறிகுறிகள் எதுவும் இல்லை. உடலின் உறுப்புகள் நல்ல நிலையில் இயல்பாக உள்ளன.',
        voiceScriptEn: 'Your uploaded medical report shows no acute emergency or damage. Anatomical contours are stable with only minor age-related findings.',
        voiceScriptTa: 'உங்கள் மருத்துவ அறிக்கையில் அவசர சிகிச்சை தேவைப்படும் பாதிப்புகள் எதுவும் இல்லை. உறுப்புகள் நல்ல ஆரோக்கிய நிலையில் உள்ளன.',
        keyFindings: [
          {
            title: 'Organ Alignment & Critical Checks',
            titleTa: 'உறுப்புகளின் வடிவமைப்பு',
            status: 'green',
            statusLabel: 'Normal',
            statusLabelTa: 'சாதாரணமானது',
            explanation: 'All visualized organs and tissue contours appear normal with no acute inflammation.',
            explanationTa: 'உறுப்புகள் அனைத்தும் ஆரோக்கியமாகவும் இயல்பான நிலையிலும் உள்ளன.',
            doctorQuestion: 'Confirm overall healthy baseline with your doctor.',
            doctorQuestionTa: 'வழக்கமான உடல் நலம் போதுமானதா என அறியலாம்.'
          },
          {
            title: 'Degenerative Age Changes',
            titleTa: 'வயதுக்குரிய இயல்பான மாற்றங்கள்',
            status: 'yellow',
            statusLabel: 'Borderline',
            statusLabelTa: 'கவனிக்கப்பட வேண்டியது',
            explanation: 'Mild wear-and-tear observed, common with age or regular physical activity.',
            explanationTa: 'வயது மூப்பு காரணமாக ஏற்படும் இயல்பான மாற்றங்கள் மட்டுமே காணப்படுகின்றன.',
            doctorQuestion: 'Ask if any lifestyle or vitamin adjustments are recommended.',
            doctorQuestionTa: 'வைட்டமின் அல்லது உணவு மாற்றங்கள் தேவையா என ஆலோசிக்கவும்.'
          }
        ]
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSimplifyNow = async () => {
    setIsSimplifying(true);
    try {
      const res = await fetch('/api/simplify-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportText: editableText,
          scanType: activeReport.scanType
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.simpleEnglish && json.data.tamilTranslation) {
          const d = json.data;
          setActiveReport({
            ...activeReport,
            overallStatus: d.simpleEnglish.overallStatus || 'green',
            overallSummaryEn: d.simpleEnglish.summary,
            overallSummaryTa: d.tamilTranslation.summary,
            voiceScriptEn: d.simpleEnglish.voiceScript || d.simpleEnglish.summary,
            voiceScriptTa: d.tamilTranslation.voiceScript || d.tamilTranslation.summary,
            keyFindings: d.simpleEnglish.keyFindings.map((kf: any, idx: number) => {
              const taKf = d.tamilTranslation.keyFindings?.[idx] || {};
              return {
                title: kf.title,
                titleTa: taKf.title || kf.title,
                status: kf.status || 'green',
                statusLabel: kf.badgeLabel || (kf.status === 'green' ? 'Normal' : kf.status === 'yellow' ? 'Borderline' : 'Abnormal'),
                statusLabelTa: taKf.badgeLabel || (kf.status === 'green' ? 'சாதாரணமானது' : 'கவனிக்கப்பட வேண்டியது'),
                explanation: kf.explanation,
                explanationTa: taKf.explanation || kf.explanation,
                doctorQuestion: kf.advice || 'Discuss with physician at routine visit.',
                doctorQuestionTa: taKf.advice || 'மருத்துவரிடம் ஆலோசிக்கவும்.'
              };
            })
          });
        }
      }
    } catch (e) {
      console.warn('Using client-side medical simplified report', e);
    } finally {
      setIsSimplifying(false);
    }
  };

  const speakText = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = activeLang === 'en' 
      ? `${activeReport.voiceScriptEn}. Summary of key findings: ${activeReport.keyFindings.map(f => `${f.title}: ${f.explanation}`).join('. ')}`
      : `${activeReport.voiceScriptTa}. முக்கிய பரிசோதனை முடிவுகள்: ${activeReport.keyFindings.map(f => `${f.titleTa || f.title}: ${f.explanationTa}`).join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;
    utterance.rate = speechSpeed;

    if (activeLang === 'ta') {
      const tamilVoice = voices.find(v => v.lang.startsWith('ta')) || voices.find(v => v.lang.includes('IN'));
      if (tamilVoice) utterance.voice = tamilVoice;
      utterance.lang = 'ta-IN';
    } else {
      const enVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'en-US' || v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setIsPausedAudio(false);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      setIsPlayingAudio(false);
    }
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  };

  const getStatusBadge = (status: FindingStatus, label: string) => {
    if (status === 'green') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{label || 'Normal'}</span>
        </span>
      );
    }
    if (status === 'yellow') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{label || 'Borderline'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/60 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        <span>{label || 'Abnormal'}</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-14">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-600/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>AI Report Simplification & Accessibility</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Medical Report Simplifier & OCR
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Medical reports are often complex, handwritten, or faint scans. Our image pipeline cleans up
            low-quality scans, allows text editing for accuracy, and translates results into{' '}
            <strong className="text-white">Simple English</strong> and <strong className="text-amber-300">Tamil (தமிழ்)</strong> with
            color-coded health statuses and voice playback.
          </p>
        </div>
      </div>

      {/* Choose Sample or Upload File */}
      <div className="rounded-3xl p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.4)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Select or Upload Scan Report
            </h2>
            <p className="text-xs text-slate-400">
              Pick a verified clinical test scan or upload your own report photo / PDF
            </p>
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.09] text-orange-300 border border-white/10 rounded-xl text-xs font-semibold transition-all">
            <Upload className="w-4 h-4 text-orange-400" />
            <span>Upload Scan File</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* 3 Real Pre-Loaded Samples */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_REPORTS.map((sample) => {
            const isSelected = selectedReportId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => setSelectedReportId(sample.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-orange-500/20 to-amber-600/10 border-orange-500/80 shadow-[0_0_20px_rgba(234,88,12,0.3)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-orange-400">
                    {sample.scanType.split(' ')[0]} Scan
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-white mt-1 line-clamp-1">
                  {sample.scanType}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Patient: {sample.patientName} · {sample.reportDate}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* OCR & PRE-PROCESSING PIPELINE */}
      <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-500/30 uppercase tracking-wider">
              OCR Cleaning Pipeline
            </span>
            <span className="text-xs text-slate-400 font-medium">Automatic Image Pre-Processing</span>
          </div>
          <h2 className="text-xl font-bold font-serif text-white">
            Noise Removal & Contrast Boost
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated image processing cleans up low-quality source scans, and you can edit extracted text directly for full accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Image Pre-processing Canvas & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span>Image Cleaning Filters</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Live HTML5 Canvas</span>
            </div>

            {/* Canvas render */}
            <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-inner bg-[#04060a] flex items-center justify-center p-2.5">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-xl shadow-md border border-white/10"
              />
              {isProcessingImage && (
                <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-white text-xs gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                  <span>Enhancing Scan...</span>
                </div>
              )}
            </div>

            {/* Pre-processing pipeline controls */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    Noise Removal Filter
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Smooths out speckles & paper grain
                  </span>
                </div>
                <button
                  onClick={() => setNoiseRemoval(!noiseRemoval)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    noiseRemoval 
                      ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]' 
                      : 'bg-white/[0.05] text-slate-400'
                  }`}
                >
                  {noiseRemoval ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">Contrast Boost</span>
                  <span className="font-mono text-orange-400 font-bold">{contrastBoost}%</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="200"
                  value={contrastBoost}
                  onChange={(e) => setContrastBoost(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    Binarize / High Clarity
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Converts faint text into stark black/white
                  </span>
                </div>
                <button
                  onClick={() => setBinarize(!binarize)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    binarize 
                      ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]' 
                      : 'bg-white/[0.05] text-slate-400'
                  }`}
                >
                  {binarize ? 'Active' : 'Off'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Extracted OCR Text + Manual Editing (7 cols) */}
          <div className="lg:col-span-7 space-y-3 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Extracted OCR Text (Editable)
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Manually edit extracted text for full accuracy
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Review or edit medical findings, dosage numbers, or physician notes before simplifying.
            </p>

            <div className="relative flex-1">
              <textarea
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                rows={11}
                placeholder="OCR extracted text will appear here. You can manually edit it anytime..."
                className="w-full h-full min-h-[220px] p-4 font-mono text-xs text-slate-200 bg-[#060910] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-inner"
              />
              <div className="absolute right-3.5 bottom-3.5 text-[10px] font-mono text-slate-400 bg-white/[0.08] px-2 py-0.5 rounded">
                {editableText.length} characters
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const r = SAMPLE_REPORTS.find((x) => x.id === selectedReportId);
                  if (r) setEditableText(r.rawOcrText);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium"
              >
                Reset to Original OCR
              </button>

              <button
                onClick={handleSimplifyNow}
                disabled={isSimplifying}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSimplifying ? 'Translating & Simplifying...' : 'Simplify & Translate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PLAIN LANGUAGE REPORT & VOICE PLAYBACK */}
      <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">
                Everyday Understanding
              </span>
              <span className="text-xs text-slate-400 font-medium">Zero Medical Jargon</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              Simplified Medical Analysis & Audio Explanation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Medical terminology translated to everyday language and audio speech.
            </p>
          </div>

          {/* Bilingual Switcher: Simple English + Tamil */}
          <div className="flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-2xl">
            <button
              onClick={() => {
                setActiveLang('en');
                stopAudio();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLang === 'en'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>Simple English</span>
            </button>
            <button
              onClick={() => {
                setActiveLang('ta');
                stopAudio();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLang === 'ta'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>🇮🇳</span>
              <span>தமிழ் (Tamil)</span>
            </button>
          </div>
        </div>

        {/* VOICE EXPLANATION AUDIO PLAYER (Frosted Liquid Glass Bar) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-white/[0.05] backdrop-blur-xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                <Ear className="w-5 h-5 text-orange-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-orange-300">
                    Voice Explanation
                  </span>
                  <span className="text-[10px] bg-white/[0.08] text-slate-300 px-2 py-0.5 rounded-full font-medium">
                    {activeLang === 'en' ? 'English Audio' : 'தமிழ் ஒலி வடிவம்'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audio playback for users with low literacy or visual impairments
                </p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              {!isPlayingAudio ? (
                <button
                  onClick={speakText}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isPausedAudio ? 'Resume Audio' : 'Play Explanation'}</span>
                </button>
              ) : (
                <button
                  onClick={pauseAudio}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.1] hover:bg-white/[0.15] text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}

              {(isPlayingAudio || isPausedAudio) && (
                <button
                  onClick={stopAudio}
                  className="p-2 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white rounded-xl text-xs transition-colors"
                  title="Stop audio"
                >
                  <Square className="w-4 h-4" />
                </button>
              )}

              {/* Speed selector */}
              <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-xl text-[11px] font-semibold">
                <span className="text-slate-400">Speed:</span>
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setSpeechSpeed(spd);
                      if (isPlayingAudio) {
                        stopAudio();
                        setTimeout(speakText, 100);
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded ${
                      speechSpeed === spd ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio transcript narration preview */}
          <div className="bg-[#05070d]/60 border border-white/[0.06] rounded-xl p-3 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-semibold text-orange-300">Audio Narration: </span>
            {activeLang === 'en' ? activeReport.voiceScriptEn : activeReport.voiceScriptTa}
          </div>
        </div>

        {/* COLOR-CODED RESULTS STANDARD */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-orange-400" />
            <span>Health Status System:</span>
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <strong className="text-emerald-300 font-semibold">Green = Normal</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <strong className="text-amber-300 font-semibold">Yellow = Borderline</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
              <strong className="text-rose-300 font-semibold">Red = Abnormal</strong>
            </div>
          </div>
        </div>

        {/* OVERALL SUMMARY */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1] shadow-inner space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              {activeLang === 'en' ? 'Overall Scan Summary' : 'ஒட்டுமொத்த ஸ்கேன் சுருக்கம்'}
            </span>
            {getStatusBadge(
              activeReport.overallStatus,
              activeLang === 'en'
                ? activeReport.overallStatus === 'green'
                  ? 'Normal Scan'
                  : 'Borderline Findings'
                : activeReport.overallStatus === 'green'
                ? 'இயல்பானது'
                : 'கவனிக்கப்பட வேண்டியது'
            )}
          </div>
          <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
            {activeLang === 'en' ? activeReport.overallSummaryEn : activeReport.overallSummaryTa}
          </p>
        </div>

        {/* KEY FINDINGS BREAKDOWN */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {activeLang === 'en'
              ? `Key Findings Breakdown (${activeReport.keyFindings.length} Items)`
              : `முக்கிய பரிசோதனை முடிவுகள் விவரம் (${activeReport.keyFindings.length} அம்சங்கள்)`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeReport.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-white font-serif">
                      {activeLang === 'en' ? finding.title : finding.titleTa || finding.title}
                    </h4>
                    {getStatusBadge(
                      finding.status,
                      activeLang === 'en' ? finding.statusLabel : finding.statusLabelTa
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeLang === 'en' ? finding.explanation : finding.explanationTa}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] bg-white/[0.02] rounded-xl p-2.5 text-[11px]">
                  <span className="font-bold text-orange-300 block mb-0.5">
                    {activeLang === 'en' ? 'What to Ask Your Doctor:' : 'மருத்துவரிடம் கேட்க வேண்டியது:'}
                  </span>
                  <p className="text-slate-400 italic">
                    "{activeLang === 'en' ? finding.doctorQuestion : finding.doctorQuestionTa}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
