---
doc: scope
status: approved
---
# Decode the Vibe

A friendly, responsive website that explains slang, internet expressions, abbreviations, and jargon, then adapts the wording to a chosen audience.

## The Unique Kernel
“Say it differently” rewrites the same phrase for the selected audience. The user can compare how one expression, such as “no cap, that was fire,” might be explained to a grandparent versus a coworker.

## Who It's For
Someone who encounters an unfamiliar slang expression or workplace term and wants to understand what it means, how it sounds, and how to respond. They may need to explain the same idea to a grandparent, parent, student, or coworker.

## The Core Loop
Enter a confusing phrase, choose an audience, and decode it. Read the plain-language meaning and likely tone, see an audience-friendly rewrite and a suggested reply, then copy the reply. Decoding the same phrase for another audience shows how the wording changes.

## Inspiration & Identity
The idea came from hearing a friend use “buddy” for a workplace role and having to ask someone else what it meant. The site should feel warm, playful, friendly, clean, and responsive on desktop and mobile, with an off-white background and soft lavender and coral accents.

## Why This Matters to the Learner
The learner wants to understand how to plan a simple project and carry it through to a working app or website, keeping it basic while making it feel original.

## What "Working" Looks Like
In a short demo, enter “it's giving main character energy,” choose grandparent, and decode it. Show a clear meaning, likely tone, a natural version for that audience, and a suggested reply with a working copy button. Then choose coworker and decode the same phrase again to show the audience-specific changes. Empty input should be handled gracefully, and a failed decode should show a helpful error. The result must come from working functionality, not a static sample result.

## The POC Boundary
Build a small, working React + Vite website with a phrase input, audience choices (grandparent, parent, student, coworker), and audience-aware AI decoding for the meaning, likely tone (such as playful, sarcastic, affectionate, rude, or angry), rewritten wording, and copyable reply. Use the existing AI endpoint rather than fixed sample output. Keep the API key secure. Include a responsive warm interface, empty-input handling, and a helpful decode-failure state.

## Later
A larger phrase library and additional features can be considered after the basic working experience is complete.

## Explicitly Cut
- Login, user profiles, and saving history: unnecessary for the single-session core loop.
- A database: the proof of concept does not need persistent user data.
- Voice features and screenshot recognition: typing or pasting a phrase is enough to demonstrate decoding.
- Social networking: sharing between users is outside the core experience.



