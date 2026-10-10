---
doc: prd
status: approved
---
# Decode the Vibe — Product Requirements

A friendly website for someone who encounters an unfamiliar slang phrase, internet expression, abbreviation, or workplace term and wants to understand it and respond appropriately.
Source: `scope.md > Who It's For`, `The Core Loop`.

## The Core Journey

1. The visitor opens Decode the Vibe and sees its name, a short tagline, a brief explanation, a phrase box, an audience selector, and a prominent **Decode** button.
2. They enter or paste a phrase and select who they are decoding it for: grandparent, parent, student, or coworker. No audience is selected by default.
3. They click **Decode**. If either required input is missing, the page shows a short field-specific message and sends no AI request. Otherwise, a loading indicator appears while the phrase is decoded.
4. The result appears on the same page in clearly labeled cards. The plain-language meaning is most prominent. The page smoothly brings the result into view.
5. The visitor can copy the suggested reply. They can select a different audience and decode the phrase again to see the wording change.

A successful demo shows the same phrase decoded first for a grandparent and then for a coworker, with an understandable meaning, likely tone, audience-specific rewrite, and working copy action.
Source: `scope.md > The Core Loop`, `What "Working" Looks Like`.

## Screens and Layout

One scrollable page; decoding does not navigate elsewhere. At the top, show the Decode the Vibe logo/name and a short tagline, followed by a brief hero explanation, a large text area with a phrase placeholder, an audience selector labeled clearly with the placeholder **Select audience**, and the prominent **Decode** button. The four audience choices are grandparent, parent, student, and coworker.

After a successful decode, show the result below the input as separate, clearly labeled cards. Bring the result into view smoothly. Make the meaning card the visual focus. Use clear headings and comfortable spacing so the cards are easy to scan.
Source: `scope.md > The Core Loop`, `Inspiration & Identity`, `What "Working" Looks Like`.

## Look and Feel

Use a warm off-white background with soft lavender and coral accents, rounded cards, subtle shadows, and simple icons. The visual tone should feel friendly and playful rather than technical. Use readable typography and generous spacing. Make the page responsive on desktop and mobile.
Source: `scope.md > Inspiration & Identity`.

## Features and Behavior

### Phrase and audience entry

- Accept a typed or pasted phrase in the large text area.
- Require both a non-blank phrase and a selected audience before decoding.
- Treat a phrase containing only spaces as blank.
- Offer exactly these audience choices for the proof of concept: grandparent, parent, student, coworker. Start with no audience selected.
- On valid submission, request a decode for the current phrase and audience.
Source: `scope.md > The Core Loop`, `The POC Boundary`.

### Decode results

Show the latest successful decode on the same page, in separate labeled cards:

- **Meaning:** a simple-language explanation, visually more prominent than the other results.
- **Tone:** a likely tone explained in plain language (for example playful, sarcastic, affectionate, rude, or angry). If context is insufficient, make the uncertainty clear; if the phrase is ambiguous, say that its meaning may depend on context.
- **Say it differently:** a natural rewrite tailored to the selected audience.
- **Suggested reply:** a suitable response and a **Copy Reply** button.

A new decode for a different audience replaces the displayed result so the visitor can compare the same phrase without creating saved history. Show a loading indicator during processing and bring the completed result into view.
Source: `scope.md > The Unique Kernel`, `The Core Loop`, `The POC Boundary`.

### Copy a suggested reply

Clicking **Copy Reply** copies the suggested reply to the clipboard. Immediately change the button label to **Copied** and show a friendly confirmation such as “Reply copied to the clipboard.” Keep the confirmation visible for about one or two seconds, then restore the original button label.
Source: `scope.md > The Core Loop`, `What "Working" Looks Like`.

## States and Boundaries

- **First visit:** Show the empty phrase box, **Select audience** placeholder, and no result.
- **Phrase missing:** If the phrase is empty or only spaces, do not send an AI request or display a result. Show: “Oops, enter a phrase if you’d like us to decode it first.” Highlight the phrase box with a subtle coral border. Clear the message/highlight once a valid phrase is entered.
- **Audience missing:** If no audience is selected, do not send an AI request or display a result. Show a short message such as: “Who are you decoding this for? Please select an audience.” Clear the message when an audience is selected.
- **Both missing:** Show the applicable message for each missing field; do not request a decode.
- **Loading:** Show that decoding is in progress while waiting for a result.
- **Decode failure:** Keep the visitor on the page and show a helpful error message.
- **Ambiguous phrase:** Explain the likely meaning and tone while noting that context may change the interpretation.
- **Success:** Show meaning, tone, audience rewrite, and suggested reply; emphasize meaning and smoothly bring the result into view.
- **Copy success:** Change the button label to **Copied**, show the brief confirmation, and restore **Copy Reply** after about one or two seconds.
- **Persistence:** No result history or user data is saved; the current result is for the current page session only.
Source: `scope.md > What "Working" Looks Like`, `The POC Boundary`, `Explicitly Cut`.

## Acceptance Criteria

- With a phrase and audience selected, **Decode** produces four labeled results: meaning, tone, audience-specific rewrite, and suggested reply.
- The meaning is visually the most prominent result, and the completed result is smoothly brought into view on the same page.
- Decoding the same phrase for a second audience produces wording tailored to that audience and replaces the previous result.
- Empty or whitespace-only phrase input and a missing audience each show the appropriate short message, make no AI request, and display no result. The phrase message clears when valid text is entered; the audience message clears when an audience is selected.
- An ambiguous phrase includes a note that meaning may depend on context; a failed decode shows a helpful message, and processing shows a loading indicator.
- **Copy Reply** copies the suggested reply, shows **Copied** and a brief confirmation for about one or two seconds, then returns to **Copy Reply**.
- The page is usable on desktop and mobile and follows the agreed warm off-white, lavender, and coral visual direction.
Source: `scope.md > What "Working" Looks Like`, `The POC Boundary`, `Inspiration & Identity`.

## Product Decisions

- The visitor must select an audience; there is no default audience, so the decode is tailored intentionally.
- Decode only after both a non-blank phrase and audience are provided; validate before any AI request.
- Keep results on one page and replace the previous result on a new decode, matching the compare-audience demo without adding history.
- Make plain-language meaning the most prominent result; acknowledge uncertainty when context is missing.
- Use warm off-white, lavender, and coral visuals. This updates the earlier dark-theme direction in the approved scope.
- Use working AI decoding rather than static sample output. The specific service and any setup or cost belong in `4-spec`; explain cost before using a paid service and keep keys secure.
Source: `scope.md > The Unique Kernel`, `The Core Loop`, `The POC Boundary`, `Inspiration & Identity`.

## What We're Building

One responsive, single-page React + Vite website with a phrase box, an initially unselected audience selector, an explicit decode action, AI-generated plain-language result cards for meaning, tone, audience rewrite, and suggested reply, loading and error handling, validation for both required inputs, and a copyable suggested reply with brief success feedback.

## Deferred From the POC

- A larger phrase library and other additional capabilities: first prove the single decode-and-compare loop.
- Any paid AI service: the service and cost must be made clear in `4-spec` before it is used.

## Possible Later Enhancements

After the core experience works, consider a larger phrase library or other additions based on what people find useful.

## Non-Goals

- Login, profiles, or saved history: unnecessary for a one-session utility.
- A database or persistent user data: outside the core loop.
- Voice input or screenshot recognition: phrase typing/pasting is enough for the demo.
- Social networking or sharing between users: not needed to explain a phrase and suggest a reply.

## Open Questions

- Exact tagline wording: can be decided during the visual build; does not block `4-spec`.
- Which AI service to use, its setup requirements, key handling, and any cost: resolve in `4-spec` before connecting a paid service. No service is selected in this product document.

