import type { Hono } from "hono";

const SUPPORTED_LANGUAGES = [
  "af", "ar", "bn", "bs", "ca", "cs", "cy", "da", "de", "el", "en", "eo", "es",
  "et", "fi", "fr", "gu", "ha", "hi", "hr", "hu", "id", "is", "it", "ja", "jw",
  "km", "kn", "ko", "la", "lv", "mk", "ml", "mr", "my", "ne", "nl", "no", "pl",
  "pt", "ro", "ru", "si", "sk", "sq", "sr", "su", "sv", "sw", "ta", "te", "th",
  "tl", "tr", "uk", "ur", "vi", "zh",
];

export function registerRoutes(app: Hono) {
  app.post("/api/speak", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.text) {
      return c.json({ error: "Missing required field: text" }, 400);
    }

    const text: string = body.text;
    const language: string = (body.language || "en").toLowerCase();

    if (text.length > 200) {
      return c.json({ error: "Text too long. Maximum 200 characters per request." }, 400);
    }

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return c.json({
        error: `Unsupported language: ${language}. Supported: ${SUPPORTED_LANGUAGES.join(", ")}`,
      }, 400);
    }

    try {
      // Google Translate TTS endpoint
      const encodedText = encodeURIComponent(text);
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${language}&client=tw-ob`;

      const resp = await fetch(ttsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://translate.google.com/",
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!resp.ok) {
        // Fallback: try alternative TTS URL format
        const altUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${language}&client=gtx&ttsspeed=1`;
        const altResp = await fetch(altUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          signal: AbortSignal.timeout(15000),
        });

        if (!altResp.ok) {
          return c.json({ error: `TTS service returned HTTP ${altResp.status}` }, 502);
        }

        const audioBuffer = await altResp.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString("base64");
        return c.json({
          audio: base64Audio,
          mimeType: "audio/mpeg",
          format: "mp3",
          language,
          textLength: text.length,
          audioSizeBytes: audioBuffer.byteLength,
        });
      }

      const audioBuffer = await resp.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString("base64");

      return c.json({
        audio: base64Audio,
        mimeType: "audio/mpeg",
        format: "mp3",
        language,
        textLength: text.length,
        audioSizeBytes: audioBuffer.byteLength,
      });
    } catch (e: any) {
      return c.json({ error: `TTS conversion failed: ${e.message}` }, 500);
    }
  });
}
