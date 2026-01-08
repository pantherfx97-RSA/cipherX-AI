
import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // To avoid alignment issues with Int16Array (which requires byteOffset to be a multiple of 2),
  // we slice the buffer to get a copy that starts exactly where the data is.
  const alignedBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const dataInt16 = new Int16Array(alignedBuffer);
  
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class GeminiService {
  private audioContext: AudioContext | null = null;

  constructor() {}

  async streamChat(modelName: string, prompt: string, history: any[] = []) {
    // Initializing Gemini client as per coding guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const enhancedInstruction = `${SYSTEM_PROMPT}\n\nCRITICAL_PROTOCOL: Always prepend your response with a detailed step-by-step reasoning path enclosed in <thought> tags. After the closing tag </thought>, provide your final answer. The thought section should break down how you analyzed the user's intent, the data provided, and the logic used for the response.`;

    const responseStream = await ai.models.generateContentStream({
      model: modelName,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ] as any,
      config: {
        systemInstruction: enhancedInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });

    return responseStream;
  }

  async speak(text: string, voiceName: string = 'Kore') {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    try {
      // Initializing Gemini client as per coding guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const cleanText = text
        .replace(/<thought>[\s\S]*?<\/thought>/g, '')
        .replace(/[*_#`~:>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 1000); 

      if (!cleanText) return null;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
          },
        },
      });

      const audioPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      const base64Audio = audioPart?.inlineData?.data;

      if (base64Audio && this.audioContext) {
        const audioBuffer = await decodeAudioData(
          decode(base64Audio),
          this.audioContext,
          24000,
          1,
        );
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        return source;
      }
    } catch (error: any) {
      console.error("Vocal Synthesis Protocol Failure:", error?.message || error);
    }
    return null;
  }

  async analyzeImage(imageData: string, prompt: string) {
    // Initializing Gemini client as per coding guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: imageData, mimeType: 'image/jpeg' } },
          { text: prompt || "Execute high-resolution inspection of this visual payload." }
        ]
      },
      config: {
        systemInstruction: SYSTEM_PROMPT
      }
    });

    return response.text;
  }
}
