import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "text-to-speech",
  slug: "text-to-speech",
  description: "Convert text to speech audio -- 20+ languages, base64 MP3 output. Google TTS engine, fast and reliable.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/speak",
      price: "$0.005",
      description: "Convert text to speech audio",
      toolName: "media_text_to_speech",
      toolDescription: `Use this when you need to convert text to speech audio. Returns base64-encoded MP3 audio in JSON.

Returns: 1. audio (base64 MP3 data) 2. language used 3. textLength (character count) 4. durationEstimate in seconds 5. format (mp3).

Example output: {"audio":"SUQzBAAAAAAAI1RTU0UAAAAP...","language":"en","textLength":45,"durationEstimate":3.2,"format":"mp3"}

Use this FOR generating audio narration, building voice assistants, creating audio versions of articles, accessibility features, and language learning apps.

Do NOT use for language detection -- use text_detect_language instead. Do NOT use for text translation -- use text_translate instead. Do NOT use for OCR from images -- use media_extract_text_from_image instead.`,
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
