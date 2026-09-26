import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '20mb' }));

// Helper to get GoogleGenAI client if key is configured
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Medical report simplification endpoint matching MEDISCAN Challenge 1 & 2
app.post('/api/simplify-report', async (req, res) => {
  try {
    const { reportText, scanType } = req.body;
    if (!reportText || typeof reportText !== 'string') {
      return res.status(400).json({ error: 'Missing reportText' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback response handled gracefully by frontend
      return res.status(200).json({
        fallback: true,
        message: 'No GEMINI_API_KEY configured. Using built-in medical simplification engine.'
      });
    }

    const prompt = `You are the core clinical engine for MEDISCAN ("Making Medical Scans Accessible & Affordable").
The user has scanned a medical diagnostic report (${scanType || 'Diagnostic Scan'}).
Analyze this report text carefully and convert it into simple everyday language that any patient can easily understand.

Crucial Rules:
1. Translate to BOTH "Simple English" and "Tamil (தமிழ்)" so every user understands their results.
2. Categorize all findings strictly using these 3 color-coded statuses:
   - "green" (Normal / Healthy / Benign)
   - "yellow" (Borderline / Mild variation / Needs monitoring)
   - "red" (Abnormal / Requires prompt medical doctor consultation)
3. Provide concise, friendly, reassuring summaries without frightening patients, yet medically accurate.
4. Prepare clean voice explanation scripts in English and Tamil for audio playback for users with low literacy.

Medical Report Text:
"""
${reportText}
"""

Return strictly valid JSON with this exact schema:
{
  "title": "Title of report (e.g. Brain MRI Scan Findings)",
  "simpleEnglish": {
    "summary": "2-3 sentences plain English summary explaining what was found in words a 12-year-old can understand.",
    "overallStatus": "green" | "yellow" | "red",
    "keyFindings": [
      {
        "title": "Short title (e.g. Brain Tissue & Blood Vessels)",
        "status": "green" | "yellow" | "red",
        "badgeLabel": "Normal" | "Borderline" | "Abnormal",
        "explanation": "Clear plain English explanation without medical jargon.",
        "advice": "Actionable next step (e.g., discuss with doctor at next routine visit, or urgent checkup)."
      }
    ],
    "voiceScript": "Natural, clear speaking script for text-to-speech explaining the patient's results simply."
  },
  "tamilTranslation": {
    "summary": "எளிய தமிழில் 2-3 வரிகளில் புரிந்துகொள்ளக்கூடிய மருத்துவ அறிக்கை சுருக்கம்.",
    "overallStatus": "green" | "yellow" | "red",
    "keyFindings": [
      {
        "title": "தமிழில் தலைப்பு (எ.கா. மூளை திசு மற்றும் இரத்த ஓட்டம்)",
        "status": "green" | "yellow" | "red",
        "badgeLabel": "சாதாரணமானது (Normal)" | "கவனிக்கப்பட வேண்டியது (Borderline)" | "மருத்துவர் ஆலோசனை தேவை (Abnormal)",
        "explanation": "எளிய தமிழில் விளக்கம்.",
        "advice": "நோயாளி அடுத்ததாக செய்ய வேண்டியது."
      }
    ],
    "voiceScript": "தமிழில் ஒலிவடிவமாக எளிமையாக வாசிப்பதற்கான சுருக்கமான உரை."
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Gemini simplify error:', error);
    return res.status(200).json({
      fallback: true,
      error: error.message || 'Error communicating with AI model'
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MEDISCAN running on http://localhost:${port}`);
  });
}

startServer();
