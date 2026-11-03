import { useEffect, useRef, useState } from "react";
import { apiUrl } from "./apiBase";

type Turn = { role: "user" | "assistant"; content: string };
const examples = ["How do I develop a design concept?", "How can daylight shape a space?", "How do I start a site analysis?"];

export default function ArchitectureChat({ ownerId }: { ownerId: string }) {
  const key = `architecture-chat:v1:${ownerId}`;
  const [messages, setMessages] = useState<Turn[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(saved) ? saved.filter((m): m is Turn => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-20) : [];
    } catch { return []; }
  });
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const controller = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  useEffect(() => {
    const probe = new AbortController();
    fetch(apiUrl("/api/studio/availability"), { signal: probe.signal }).then(r => r.ok ? r.json() : null).then(data => setConfigured(data?.configured ?? null)).catch(() => {});
    return () => { probe.abort(); controller.current?.abort(); };
  }, []);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(messages)); setSaveError(""); }
    catch { setSaveError("This chat could not be saved in your browser."); }
  }, [key, messages]);
  async function ask() {
    const text = question.trim();
    if (!text || inFlight.current) return;
    inFlight.current = true;
    setBusy(true); setError("");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 100000);
    try {
      const response = await fetch(apiUrl("/api/studio/learn"), {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history: messages.slice(-12) }), signal: controller.current.signal,
      });
      if (!response.ok) throw new Error(response.status === 503 ? "Live AI is not configured yet. You can still use Exercises & progress." : "The tutor could not answer. Please try again.");
      const data = await response.json();
      if (typeof data.answer !== "string" || !data.answer.trim()) throw new Error("The tutor returned an empty answer. Please try again.");
      setMessages(previous => [...previous, { role: "user" as const, content: text }, { role: "assistant" as const, content: data.answer }].slice(-20));
      setQuestion("");
    } catch (e) { setError(e instanceof Error && e.name !== "AbortError" ? e.message : "The request stopped or timed out. Please try again."); }
    finally { clearTimeout(timeout); inFlight.current = false; setBusy(false); }
  }
  return <main className="architecture-chat">
    <header><p className="studio-eyebrow">Learning Mode</p><h1>Ask about architecture</h1><p>Explore a concept, ask a question, or work through a design idea.</p></header>
    {configured === false && <p role="status">Live AI is not configured yet. Exercises &amp; progress works without it.</p>}
    <div className="architecture-chat-examples">{examples.map(example => <button key={example} disabled={busy} onClick={() => setQuestion(example)}>{example}</button>)}</div>
    <div className="architecture-chat-messages" role="log" aria-label="Architecture conversation" aria-live="polite">
      {messages.map((message, index) => <article className={`architecture-message architecture-message--${message.role}`} key={index}><strong>{message.role === "user" ? "You" : "Architecture tutor"}</strong><p>{message.content}</p></article>)}
    </div>
    <form onSubmit={event => { event.preventDefault(); void ask(); }}>
      <label htmlFor="architecture-question">Your question</label>
      <textarea id="architecture-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={2000} disabled={busy} placeholder="Ask about site, form, light, circulation, or another studio topic…" rows={3} />
      <button type="submit" disabled={busy || !question.trim()}>{busy ? "Thinking…" : "Ask tutor"}</button>
    </form>
    {error && <p role="alert">{error}</p>}{saveError && <p role="alert">{saveError}</p>}
    <p className="studio-small">Recent messages stay in this browser. General learning guidance; verify code requirements with official sources. For assignment-specific help, use <a href="/studio">Studio</a>.</p>
  </main>;
}
