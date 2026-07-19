# Text to Speech API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://text-to-speech.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Convert text to speech audio -- 20+ languages, base64 MP3 output. Google TTS engine, fast and reliable. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "text-to-speech": {
      "url": "https://text-to-speech.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://text-to-speech.api.klymax402.com/api/speak" \
  -H "Content-Type: application/json" \
  -d '{"text":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `media_text_to_speech` | POST | `/api/speak` | $0.012 | Convert text to speech audio |

### `media_text_to_speech`

Use this when you need to convert text to speech audio. Returns base64-encoded MP3 audio in JSON.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | The text to convert to speech (max 200 characters per request) |
| `language` | string | no | Language code: en, fr, es, de, it, pt, ja, ko, zh, ar, ru, hi, etc. (default: en) |

Example response:

```json
{"audio":"SUQzBAAAAAAAI1RTU0UAAAAP...","language":"en","textLength":45,"durationEstimate":3.2,"format":"mp3"}
```

**When to use**: generating audio narration, building voice assistants, creating audio versions of articles, accessibility features, and language learning apps.

**Not for**: language detection (use `text_detect_language`), text translation (use `text_translate`), OCR from images (use `media_extract_text_from_image`).

## Example agent prompts

- "Convert text to speech audio"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
