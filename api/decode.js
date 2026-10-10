import OpenAI from 'openai';

const audiences = new Set(['grandparent', 'parent', 'student', 'coworker']);
const resultSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    meaning: { type: 'string' },
    tone: { type: 'string' },
    audience_rewrite: { type: 'string' },
    suggested_reply: { type: 'string' },
  },
  required: ['meaning', 'tone', 'audience_rewrite', 'suggested_reply'],
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Please send a phrase using the decode form.' });
  }

  const { phrase, audience } = request.body ?? {};
  if (typeof phrase !== 'string' || !phrase.trim() || phrase.trim().length > 500) {
    return response.status(400).json({ error: 'Enter a phrase between 1 and 500 characters.' });
  }
  if (typeof audience !== 'string' || !audiences.has(audience)) {
    return response.status(400).json({ error: 'Choose one of the available audiences before decoding.' });
  }
  if (!process.env.OPENAI_API_KEY) {
    return response.status(503).json({ error: 'The decoder needs its private API key configured before it can work. Please try again later.' });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.responses.create({
      model: 'gpt-6-luna',
      reasoning: { effort: 'none' },
      max_output_tokens: 500,
      instructions: [
        'You explain slang, internet expressions, abbreviations, workplace jargon, and confusing messages in plain, friendly language.',
        'Return concise, respectful language. Do not overstate what a short fragment proves about a speaker’s intent.',
        'Describe the likely tone in plain language. If context is limited or a phrase has multiple meanings, mention that uncertainty briefly in the tone field.',
        'Tailor audience_rewrite and suggested_reply naturally to the selected audience. Avoid condescension or stereotypes.',
        'Keep each field short and directly useful. The audience values are grandparent, parent, student, and coworker.',
      ].join(' '),
      input: `Audience: ${audience}\nPhrase to explain: ${phrase.trim()}`,
      text: {
        format: {
          type: 'json_schema',
          name: 'decode_result',
          strict: true,
          schema: resultSchema,
        },
      },
    });

    if (result.status !== 'completed' || !result.output_text) {
      return response.status(502).json({ error: 'The decoder couldn’t finish that explanation. Please try again with a shorter phrase.' });
    }
    const decoded = JSON.parse(result.output_text);
    return response.status(200).json({ result: decoded });
  } catch (error) {
    console.error('Decode request failed:', error?.name || 'UnknownError', error?.status || '');
    return response.status(502).json({ error: 'We couldn’t decode that just now. Please try again in a moment.' });
  }
}
