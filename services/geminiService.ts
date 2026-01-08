
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const enhancedInstruction = `${SYSTEM_PROMPT}\n\nCRITICAL_PROTOCOL: Always prepend your response with a detailed step-by-step reasoning path enclosed in <thought> tags. After the closing tag </thought>, provide your final answer. Break down analysis clearly.`;

    return await ai.models.generateContentStream({
      model: modelName,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: enhancedInstruction,
        temperature: 0.8,
        topP: 0.95,
        topK: 64,
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });
  }

  async speak(text: string, voiceName: string = 'Kore') {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const cleanText = text
        .replace(/<thought>[\s\S]*?<\/thought>/g, '')
        .replace(/[*_#`~:>]/g, '')
        .trim();

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
    } catch (error) {
      console.error("Vocal Synthesis Protocol Failure:", error);
    }
    return null;
  }

  async analyzeImage(imageData: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: imageData, mimeType: 'image/jpeg' } },
          { text: prompt || "Analyze this visual payload." }
        ]
      },
      config: {
        systemInstruction: SYSTEM_PROMPT
      }
    });

    return response.text;
  }
}
