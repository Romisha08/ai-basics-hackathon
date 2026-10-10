---
doc: spec
status: approved
---

# Decode the Vibe — Technical Spec

## How This Works, In Plain Language

The page is built with React and custom CSS, with Vite helping run it locally and prepare it for publishing. When a visitor submits a phrase and audience, the page sends those two values to a small Node.js function hosted by Vercel. That function checks the inputs, reads the private OpenAI key from a server environment variable, asks GPT-6 Luna for a structured explanation, and returns the result to the page. The page displays four result cards and handles copying the reply.

The browser never receives the OpenAI key. A server function is the small backend this project needs; Express would add another layer without helping this one-endpoint proof of concept.

## The Core Journey Through the System

1. Vite serves the single page in the visitor's browser.
2. Browser JavaScript checks that the trimmed phrase is non-empty, no longer than 500 characters, and that the audience is one of the four allowed values. Missing values show the PRD's field-specific messages and stop here.
3. For valid input, JavaScript shows loading feedback and sends `{ phrase, audience }` as JSON to `POST /api/decode`.
4. The Vercel Node.js Function validates the request again, calls OpenAI's Responses API once, and asks for schema-shaped output. The OpenAI secret stays on the server.
5. The function returns four displayed result fields as JSON. The browser renders the cards, smoothly scrolls them into view, and offers the copy action. A later audience decode replaces these in-memory results.

PRD ref: `prd.md > The Core Journey`, `Features and Behavior > Phrase and audience entry`, `Features and Behavior > Decode results`, `Features and Behavior > Copy a suggested reply`.

## Stack

| Part | Choice | Why it fits |
|---|---|---|
| Browser app | React, Vite, custom CSS | The learner's latest build request specifies React + Vite; one small component keeps the single-page interface understandable. |
| Local build tool | Vite | Gives a simple local development server and production build for a small browser app. [Vite guide](https://vite.dev/guide/) |
| Server runtime and host | Node.js Vercel Function under `api/` | Provides the private backend endpoint alongside a Vite static site; Express is unnecessary for one endpoint. [Vercel Functions with Vite](https://vercel.com/docs/frameworks/frontend/vite) |
| AI client | Official `openai` JavaScript SDK, called only from the function | Keeps the provider request and key on the server, using the Responses API. [OpenAI JS library](https://developers.openai.com/api/reference/typescript) |
| AI model | `gpt-6-luna` | Cost-efficient for focused tasks and supports Responses and structured outputs. Current listed standard rates: $0.10/1M input tokens and $0.50/1M output tokens. [Model and pricing](https://developers.openai.com/api/docs/models/gpt-6-luna) |

Pin actual dependency versions in `package-lock.json` during setup; do not guess a package version in this plan. Keep the Node version aligned with the current Vercel runtime and SDK support during the build.

## Where It Runs and How Someone Tries It

- **Local:** Node.js and npm are installed; the project uses Vite for frontend work and Vercel CLI `vercel dev` to run the frontend and `/api/decode` together. Vercel documents `vercel dev` as a way to reproduce its functions locally. [Local development](https://vercel.com/docs/cli/dev)
- **Secret:** `OPENAI_API_KEY` is set in an ignored local environment file for development and in Vercel project environment settings for deployment. It must never use a `VITE_` prefix or appear in browser code, committed files, screenshots, or public logs. OpenAI explicitly says API keys must not be exposed in client-side code. [API authentication and key safety](https://developers.openai.com/api/reference/overview)
- **Local start:** after setup, use `npm install`, configure the local secret, then `npm run dev:full`; open the local URL printed by the command. The exact scripts and setup steps will be confirmed in `5-build`.
- **Deployment:** Vercel is the selected host so the same function pattern works locally and online. The public URL is not access-controlled: anyone who receives it can use the decoder. Share it selectively as planned. Vercel plan limits and eligibility should be checked when deploying; OpenAI API usage is separate from hosting.
- **Demo:** run locally first; demonstrate one phrase for grandparent then coworker, including copy, and show empty-input validation. The hackathon submission also requires a short video and a public GitHub repository; deployment complements those requirements and does not replace them.

## Look and Feel

Carry forward the approved warm off-white background, lavender and coral accents, rounded cards, subtle shadows, simple icons, readable typography, and generous spacing. Keep the tone playful and reassuring. The meaning card gets the strongest visual emphasis. Use responsive CSS so input and result cards remain easy to use on a phone. This preserves `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

## Components

### Single-page interface (`index.html`, `src/main.jsx`, `src/style.css`)

Renders the brand/tagline, explanation, phrase textarea with a 500-character limit, audience selector with no default, validation feedback, loading state, four result cards, error message, and copy confirmation. Handles same-page scroll-to-results and replaces the previous result after a successful re-decode.

PRD ref: `prd.md > Screens and Layout`, `Features and Behavior > Phrase and audience entry`, `Features and Behavior > Decode results`, `Features and Behavior > Copy a suggested reply`, `States and Boundaries`.

### Decode endpoint (`api/decode.js`)

Accepts only `POST` JSON with `phrase` and `audience`; permits audiences `grandparent`, `parent`, `student`, `coworker`; trims phrase and rejects blank or over-500-character input. Calls the model once after validation. Returns a stable JSON result or a safe, helpful error response. It does not store inputs or results.

PRD ref: `prd.md > Features and Behavior > Phrase and audience entry`, `States and Boundaries`, `Product Decisions`.

### Result renderer and clipboard action (`src/main.jsx`)

Displays meaning, likely tone (including a brief uncertainty note when useful), audience rewrite, and suggested reply. Copy uses `navigator.clipboard.writeText`; on success it shows “Copied” and a brief confirmation, then restores the button label. Clipboard failure shows a short fallback message and leaves the reply selectable for manual copying.

PRD ref: `prd.md > Features and Behavior > Decode results`, `Features and Behavior > Copy a suggested reply`, `States and Boundaries`.

## Data Model

There is no database. The only application data is transient browser state for the current page visit:

```text
form: { phrase: string, audience: "" | "grandparent" | "parent" | "student" | "coworker" }
result: null | {
  meaning: string,
  tone: string,
  audience_rewrite: string,
  suggested_reply: string
}
```

Tone includes a brief uncertainty caveat when context is limited. The current result is replaced after a successful decode and disappears when the page is closed or refreshed. The API key exists only in the server environment.

## File Structure

```text
project/
├── api/
│   └── decode.js          # validates request and calls OpenAI Responses API
├── src/
│   ├── main.jsx           # React page, form behavior, validation, clipboard
│   └── style.css          # responsive warm visual system
├── devpost/               # planning documents
├── index.html              # page shell and app entry
├── package.json            # scripts and dependencies
├── package-lock.json       # locked installed versions
├── .env.example            # variable name only; no real secret
└── .gitignore              # excludes local secrets and generated files
```

## External Services and Dependencies

### OpenAI Responses API

The endpoint makes one `POST /v1/responses` request per valid decode, using model `gpt-6-luna`, a concise instruction, the phrase and selected audience, and `max_output_tokens: 500`. Use strict JSON Schema output with required string fields `meaning`, `tone`, `audience_rewrite`, and `suggested_reply`. Prompt the model to use plain, respectful language, explain likely tone without claiming certainty, include a brief uncertainty caveat in the tone where needed, tailor the rewrite and reply to the audience, and avoid treating a fragment as proof of intent. OpenAI's structured output feature can constrain responses to a defined schema; incomplete or refused responses still need a safe error path. [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create), [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses)

**Cost plan chosen earlier:** use a dedicated OpenAI project with a $0.50 hard spend limit and an alert at $0.40. Keep request length to 500 characters, cap output at 500 tokens, validate before calling, and make no automatic retries. At an illustrative 600 input / 400 output tokens, current standard rates imply about $0.00026 per decode (around 1,900 such calls per $0.50); actual use varies with prompt and output length. A hard limit may not stop spend instantly and can be exceeded slightly while usage updates, so it is a guardrail, not an exact guarantee. Check current [spend-limit behavior](https://developers.openai.com/api/docs/guides/spend-limits) and [model pricing](https://developers.openai.com/api/docs/models/gpt-6-luna) before deployment. The learner authorized up to $0.50 of API spend, with a $0.40 alert.

### Vercel

Hosts static build output and the Node.js function. A Vercel account and CLI/project setup are needed for local function emulation and deployment. Vercel hosting limits and plan details should be confirmed at deployment; OpenAI usage charges are separate. [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel CLI dev](https://vercel.com/docs/cli/dev).

## Important Failure Modes

- **Missing phrase or audience** → show the matching friendly field message, mark the field, and do not call the API.
- **Slow, unavailable, refused, or incomplete AI response** → keep the form on the page, stop loading, show a helpful retry-later message, and do not display a partial result or automatically retry.
- **Clipboard unavailable or denied** → explain that copying failed and leave the reply visible for manual selection.
- **Spend cap or provider rate limit reached** → show the same helpful decode error; never expose raw provider errors or the secret key to the browser.

## What Was Simplified and Why

- **One Vercel function** instead of an Express server → one route is all the proof of concept needs; this keeps the backend vocabulary and setup small.
- **Transient page state** instead of database and saved history → supports the grandparent/coworker comparison without persistent user data.
- **One AI request and fixed response schema** instead of a phrase library, multi-step agent flow, or retrieval system → proves the central decode experience while containing cost and moving parts.
- **No account or authentication** → keeps first use simple. The deployed link can be used by anyone who has it, so share selectively.

## Decisions and Open Issues

- **Learner-approved:** React + Vite with custom CSS, one Node.js Vercel Function, and Vercel hosting. Express is not needed for this single endpoint. Tradeoff: a serverless function is convenient here, but it is tied to Vercel's function conventions.
- **Learner-approved:** GPT-6 Luna, dedicated OpenAI project with $0.50 cap and $0.40 alert, 500-character input limit, local development before deployment, and selective sharing. Cost estimates are indicative; the hard cap may lag slightly.
- **Clarified uncertainty:** the learner asked if a backend such as Node.js and Express was necessary. The browser cannot safely hold the OpenAI secret; Node.js is the server runtime, and a Vercel Function provides the small backend route. Express is optional and unnecessary here.
- **Still to confirm during build:** exact dependency versions, local environment setup, the preferred tagline, and whether the Vercel project can use the intended function layout without a plugin. Resolve the function layout early with a local `vercel dev` smoke check before implementing the full UI.
- **PRD open question resolved:** AI provider/model, key handling, and cost controls are specified above.
- **No remaining product or architecture choice blocks the proof of concept.**

