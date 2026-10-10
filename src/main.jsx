import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const audiences = [
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'parent', label: 'Parent' },
  { value: 'student', label: 'Student' },
  { value: 'coworker', label: 'Coworker' },
];

function App() {
  const [phrase, setPhrase] = useState('');
  const [audience, setAudience] = useState('');
  const [errors, setErrors] = useState({ phrase: '', audience: '' });
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef(null);
  const copyTimer = useRef(null);

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [result]);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  async function decode(event) {
    event.preventDefault();
    setStatus('');
    setResult(null);
    setCopied(false);

    const nextErrors = {
      phrase: phrase.trim() ? '' : 'Oops, enter a phrase if you’d like us to decode it first.',
      audience: audience ? '' : 'Who are you decoding this for? Please select an audience.',
    };
    setErrors(nextErrors);
    if (nextErrors.phrase || nextErrors.audience) return;

    setLoading(true);
    setStatus('A moment while we untangle that phrase…');
    try {
      const response = await fetch('/api/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase: phrase.trim(), audience }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'We couldn’t decode that just now. Please try again in a moment.');
      setResult(payload.result);
      setStatus('');
    } catch (error) {
      setStatus(error.message || 'We couldn’t decode that just now. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  async function copyReply() {
    if (!result?.suggested_reply) return;
    try {
      await navigator.clipboard.writeText(result.suggested_reply);
      setCopied(true);
      setStatus('');
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopied(false);
        setStatus('');
      }, 1600);
    } catch {
      setStatus('Copy isn’t available here—select the reply above to copy it.');
    }
  }

  return (
    <div className="page-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Decode the Vibe home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>decode <strong>the vibe</strong></span>
        </a>
        <span className="header-note"><span className="status-dot" />Your friendly phrase translator</span>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> A little less “huh?”</p>
            <h1 id="hero-title">Understand the words.<br /><span>Get the vibe.</span></h1>
            <p className="hero-description">Slang, internet speak, and work jargon—explained simply, with a tone and reply that fit.</p>
          </div>
          <div className="hero-sticker" aria-hidden="true"><span>wait,<br />what? <b>↘</b></span><i>✳</i></div>
        </section>

        <section className="decoder-card" aria-labelledby="decoder-title">
          <div className="card-heading">
            <div><p className="eyebrow">YOUR DECODER</p><h2 id="decoder-title">What did they mean?</h2></div>
            <span className="sparkle" aria-hidden="true">✦</span>
          </div>
          <form onSubmit={decode} noValidate aria-busy={loading}>
            <label htmlFor="phrase">The phrase or message</label>
            <div className={`textarea-wrap${errors.phrase ? ' has-error' : ''}`}>
              <textarea
                id="phrase"
                name="phrase"
                maxLength={500}
                rows={4}
                placeholder="Paste a phrase, work message, or bit of internet speak…"
                value={phrase}
                aria-invalid={Boolean(errors.phrase)}
                aria-describedby="phrase-help phrase-error"
                onChange={(event) => {
                  setPhrase(event.target.value);
                  if (event.target.value.trim()) setErrors((current) => ({ ...current, phrase: '' }));
                }}
              />
              <span className="character-count">{phrase.length} / 500</span>
            </div>
            <p id="phrase-help" className="field-hint">A few words or a whole message—both work.</p>
            <p id="phrase-error" className="field-error" aria-live="polite">{errors.phrase}</p>

            <label htmlFor="audience" className="audience-label">Who are you decoding this for?</label>
            <div className="select-wrap">
              <select
                id="audience"
                name="audience"
                value={audience}
                aria-invalid={Boolean(errors.audience)}
                aria-describedby="audience-error"
                className={errors.audience ? 'has-error' : ''}
                onChange={(event) => {
                  setAudience(event.target.value);
                  if (event.target.value) setErrors((current) => ({ ...current, audience: '' }));
                }}
              >
                <option value="">Select an audience</option>
                {audiences.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <span aria-hidden="true">⌄</span>
            </div>
            <p id="audience-error" className="field-error" aria-live="polite">{errors.audience}</p>

            <button className="decode-button" type="submit" disabled={loading}>
              {loading ? <><span className="spinner" aria-hidden="true" />Finding the words…</> : <>Decode the vibe <span aria-hidden="true">↗</span></>}
            </button>
            <p className="privacy-note"><span aria-hidden="true">✿</span> Just for this moment. Nothing is saved.</p>
          </form>
        </section>

        {status && <p className={`status-message${loading ? ' is-loading' : ''}`} role="status">{status}</p>}

        {result && (
          <section id="results" ref={resultsRef} className="results" aria-labelledby="results-title">
            <div className="results-heading">
              <div><p className="eyebrow">THE TRANSLATION</p><h2 id="results-title">Here’s the vibe</h2></div>
              <span className="audience-chip">{audiences.find((option) => option.value === audience)?.label}</span>
            </div>
            <article className="result-card meaning-card">
              <div className="result-label"><span className="result-icon" aria-hidden="true">✧</span><h3>In plain words</h3></div>
              <p className="meaning-text">{result.meaning}</p>
            </article>
            <div className="result-grid">
              <article className="result-card tone-card">
                <div className="result-label"><span className="result-icon coral" aria-hidden="true">◉</span><h3>Likely tone</h3></div>
                <p>{result.tone}</p>
              </article>
              <article className="result-card rewrite-card">
                <div className="result-label"><span className="result-icon" aria-hidden="true">↝</span><h3>Say it simply</h3></div>
                <p>{result.audience_rewrite}</p>
                <span className="mini-caption">A version for your {audiences.find((option) => option.value === audience)?.label.toLowerCase()}</span>
              </article>
              <article className="result-card reply-card">
                <div className="result-label"><span className="result-icon coral" aria-hidden="true">↩</span><h3>A reply you could send</h3></div>
                <p>{result.suggested_reply}</p>
                <button className="copy-button" type="button" onClick={copyReply}>
                  {copied ? 'Copied' : 'Copy reply'} <span aria-hidden="true">{copied ? '✓' : '▢'}</span>
                </button>
                <p className="copy-feedback" aria-live="polite">{copied ? 'Reply copied to the clipboard.' : ''}</p>
              </article>
            </div>
            <p className="context-footnote">Tone can shift with context and delivery. This is a best guess, not mind-reading.</p>
          </section>
        )}
      </main>

      <footer><span>Made for the “wait, what does that mean?” moments.</span><span className="footer-star" aria-hidden="true">✳</span></footer>
    </div>
  );
}

createRoot(document.querySelector('#root')).render(<App />);
