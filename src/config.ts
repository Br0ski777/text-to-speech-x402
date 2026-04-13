import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "text-to-speech",
  slug: "text-to-speech",
  description: "Convert text to speech audio using Google Translate TTS engine.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/speak",
      price: "$0.005",
      description: "Convert text to speech audio",
      toolName: "media_text_to_speech",
      toolDescription: "Use this when you need to convert text to speech audio. Uses Google Translate TTS engine (free). Supports multiple languages (en, fr, es, de, ja, zh, etc.). Returns base64-encoded MP3 audio with metadata. Do NOT use for language detection — use text_detect_language instead. Do NOT use for text translation — use text_translate instead.",
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "The text to convert to speech (max 200 characters per request)" },
          language: { type: "string", description: "Language code: en, fr, es, de, it, pt, ja, ko, zh, ar, ru, hi, etc. (default: en)" },
        },
        required: ["text"],
      },
    },
  ],
};
