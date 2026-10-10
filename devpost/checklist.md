---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Build the React Decode the Vibe MVP**
  Becomes usable: A running single-page React + Vite app lets someone enter a phrase, choose an audience, get a real AI-generated meaning, tone, audience rewrite, and suggested reply, then copy that reply.
  Why now: The app already has a working idea and server endpoint. This single end-to-end slice updates the frontend to the requested React stack and keeps the demo focused on the core decode loop.
  PRD ref: `prd.md > The Core Journey`; `prd.md > Features and Behavior > Phrase and audience entry`; `prd.md > Features and Behavior > Decode results`; `prd.md > Features and Behavior > Copy a suggested reply`; `prd.md > States and Boundaries`; `prd.md > Acceptance Criteria`.
  Spec ref: `spec.md > The Core Journey Through the System`; `spec.md > Stack`; `spec.md > Where It Runs and How Someone Tries It`; `spec.md > Components`; `spec.md > Data Model`; `spec.md > External Services and Dependencies`; `spec.md > Important Failure Modes`.
  Build: Convert the current single-page frontend to React + Vite with custom responsive CSS. Keep the existing private `/api/decode` endpoint and OpenAI key server-side. Show only the phrase and audience controls plus four result cards (meaning, tone, audience rewrite, suggested reply); keep blank-input/audience checks, loading/error feedback, result scroll, and reply copy confirmation. Do not add login, persistence, extra routes, features, or MCP integrations.
  Verify (mechanical): Run `npm run build`; run the app locally with `/api/decode` available; submit one phrase for grandparent and coworker and confirm the four fields are returned and tailored; check empty phrase and missing audience produce no API call; check the copy button copies the reply and reports success; check the layout at desktop and phone widths. Keep real API calls to the authorized demo use only.
  Learner check: Open the local app, decode “it's giving main character energy” for a grandparent, then switch to coworker and decode it again. Compare the rewrite and tone, copy the reply, and try one missing-input case. Tell me what looked confusing or what you'd change.
  Commit: `Build React Decode the Vibe MVP`

## Hands-on Checkpoints

- [x] MVP demo and final kick-the-tires review — learner tried the core flow locally, reported that it was working perfectly, and chose to keep the app unchanged. No fixes were requested.

## Final Review

- [x] Final review complete — local build and core journey were verified; learner reported that the app works perfectly and chose to keep the current version for shipping.

## Code Tour and App Map

- [x] Learning activity complete — guided route through the input, API call, and visible result, connecting the code route to the reusable input → processing → output practice.
- [x] Optional edit and transfer reflection addressed — learner chose to keep the app unchanged; the reusable practice was connected during the walkthrough.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse.

Activity and evidence: The learner used VS Code to follow the previously tested decode journey through the input validation/request, server handler/AI response, and result display/copy action; they confirmed each stop.
Route and stops: `src/main.jsx` — `decode(event)`; `api/decode.js` — `handler` and `client.responses.create`; `src/main.jsx` — `{result && (` and `copyReply()`.
Edit outcome: Declined; keep the app as-is.
Reflection: Reusable practice connected during the guided route: trace one user action from input to processing to visible output.
Activity mode: Guided code tour in VS Code, grounded in the live app journey.

## Revisions

- Updated the approved implementation brief at the learner's request: use React + Vite with custom CSS, remove the separate “when to use it” result, and keep the visible MVP to meaning, tone, audience rewrite, and suggested reply. This keeps the end-to-end demo focused and reflects the latest user direction.
