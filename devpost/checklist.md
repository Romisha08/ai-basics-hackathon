---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [ ] **1. Build the React Decode the Vibe MVP**
  Becomes usable: A running single-page React + Vite app lets someone enter a phrase, choose an audience, get a real AI-generated meaning, tone, audience rewrite, and suggested reply, then copy that reply.
  Why now: The app already has a working idea and server endpoint. This single end-to-end slice updates the frontend to the requested React stack and keeps the demo focused on the core decode loop.
  PRD ref: `prd.md > The Core Journey`; `prd.md > Features and Behavior > Phrase and audience entry`; `prd.md > Features and Behavior > Decode results`; `prd.md > Features and Behavior > Copy a suggested reply`; `prd.md > States and Boundaries`; `prd.md > Acceptance Criteria`.
  Spec ref: `spec.md > The Core Journey Through the System`; `spec.md > Stack`; `spec.md > Where It Runs and How Someone Tries It`; `spec.md > Components`; `spec.md > Data Model`; `spec.md > External Services and Dependencies`; `spec.md > Important Failure Modes`.
  Build: Convert the current single-page frontend to React + Vite with custom responsive CSS. Keep the existing private `/api/decode` endpoint and OpenAI key server-side. Show only the phrase and audience controls plus four result cards (meaning, tone, audience rewrite, suggested reply); keep blank-input/audience checks, loading/error feedback, result scroll, and reply copy confirmation. Do not add login, persistence, extra routes, features, or MCP integrations.
  Verify (mechanical): Run `npm run build`; run the app locally with `/api/decode` available; submit one phrase for grandparent and coworker and confirm the four fields are returned and tailored; check empty phrase and missing audience produce no API call; check the copy button copies the reply and reports success; check the layout at desktop and phone widths. Keep real API calls to the authorized demo use only.
  Learner check: Open the local app, decode “it's giving main character energy” for a grandparent, then switch to coworker and decode it again. Compare the rewrite and tone, copy the reply, and try one missing-input case. Tell me what looked confusing or what you'd change.
  Commit: `Build React Decode the Vibe MVP`

## Hands-on Checkpoints

- [ ] MVP demo and final kick-the-tires review — after the learner check above, gather feedback; make and verify any requested fixes before final review.

## Final Review

- [ ] Final review complete — feedback resolved, verification passes, and learner confirms ready to ship.

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap.
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate.
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse.

Activity and evidence: [record the actual activity and code locations after building]
Route and stops: [record the actual code route after the tour]
Edit outcome: [tried/kept/reverted/declined/not applicable]
Reflection: [offered/answered/declined/already covered]
Activity mode: [record live app/editor, focused alternative, prior practice, or recap]

## Revisions

- Updated the approved implementation brief at the learner's request: use React + Vite with custom CSS, remove the separate “when to use it” result, and keep the visible MVP to meaning, tone, audience rewrite, and suggested reply. This keeps the end-to-end demo focused and reflects the latest user direction.
