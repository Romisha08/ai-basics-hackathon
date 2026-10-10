# Decode the Vibe

A small, single-page app that explains slang, internet expressions, abbreviations, and workplace jargon in plain language. Choose an audience to get a simple meaning, likely tone, audience-specific rewrite, and suggested reply.

## Live demo

[Decode-the-vibe]()

## Run locally

You need Node.js and npm installed.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and put your OpenAI API key in `.env.local` as `OPENAI_API_KEY`. Keep the key private; do not put it in frontend code or commit `.env.local`.

3. Start the app and its local API endpoint:

   ```bash
   npm run dev:full
   ```

4. Open the local URL printed by Vercel CLI (the configured default is `http://127.0.0.1:3000`).

Create a production frontend build with `npm run build`.

## How it works

- The React page validates the phrase and selected audience before sending a request.
- The Vercel function at `/api/decode` validates the request and calls OpenAI with the server-side `OPENAI_API_KEY`.
- The page displays the meaning, tone, rewrite, and suggested reply; the reply can be copied.

Each valid decode calls the OpenAI API and may incur usage charges. Set and monitor your usage limits in your OpenAI account. The key is required locally and should be added to Vercel's server-side environment variables for deployment.
