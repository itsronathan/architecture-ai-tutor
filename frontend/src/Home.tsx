import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user, loading, setShowSignIn } = useAuth();

  return (
    <div className="home-scrap">
      <div className="home-inner">
        {/* studio drawing marks */}
        <div className="hs-glyphs" aria-hidden>
          <span className="hs-g g1">↗</span>
          <span className="hs-g g2">▱</span>
          <span className="hs-g g3">△</span>
          <span className="hs-g g4">⌜</span>
          <span className="hs-g g5">▭</span>
          <span className="hs-g g6">↔</span>
          <span className="hs-g g7">☰</span>
          <span className="hs-g g8">○</span>
          <span className="hs-g g9 mono">N ↑</span>
          <span className="hs-g g10 mono">1:100</span>
        </div>

        <div className="hs-wrap">
          {/* HERO */}
          <section className="hs-hero">
            <div className="hs-hero-copy">
              <span className="hs-eyebrow">start here</span>
              <h1 className="hs-headline">
                Architecture<br />
                <span className="hs-mark">AI Tutor</span>
              </h1>
              <p className="hs-lede">
                Explore design ideas, understand your brief, and build your studio project.
              </p>

              {!loading && user && (
                <div className="hs-signedin">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="hs-signedin-avatar" referrerPolicy="no-referrer" />
                  ) : null}
                  <span>
                    Signed in as <strong>{user.isAnonymous ? "Guest" : user.displayName || user.email}</strong>
                  </span>
                </div>
              )}

              <div className="hs-cta-row">
                <Link to="/learning" className="hs-btn-primary">
                  {user ? "Continue to Learning Mode" : "Start learning"} <span className="hs-arrow">→</span>
                </Link>
                {!loading && !user && <span className="hs-note">↜ free for students!</span>}
              </div>

              <div className="hs-cta-row hs-cta-row--sub">
                <Link to="/studio" className="hs-btn-ghost">Try Studio Brainstorm →</Link>
              </div>

              {!loading && !user && (
                <div className="hs-cta-row hs-cta-row--sub">
                  <button type="button" className="hs-btn-ghost" onClick={() => setShowSignIn(true)}>
                    Sign in
                  </button>
                  <p className="hs-microcopy">
                    Open Learning Mode without an account. <span className="hs-dot">●</span> Sign in to save
                    chats &amp; sync progress.
                  </p>
                </div>
              )}
            </div>

            {/* COLLAGE */}
            <div className="hs-collage">
              <figure className="hs-card hs-polaroid">
                <span className="hs-tape hs-tape--top" />
                <div className="hs-photo">
                  <svg viewBox="0 0 220 200" aria-hidden>
                    <g stroke="#292c29" strokeWidth="1.5" fill="none">
                      <path d="M30 110 105 67 190 116 115 159Z" fill="#deded3" />
                      <path d="M30 110V64L105 21V67M30 64 115 113 190 70V116M115 113V159M105 21 190 70" />
                      <path d="M53 96V67L105 37 167 73V102L115 132Z" fill="#eeeae1" />
                      <path d="m53 67 62 36 52-30M115 103v29M105 37v30l62 35M105 67 53 96" />
                      <path d="m77 110 28-16 39 22-28 16Z" fill="#e4c6b7" stroke="#98412a" />
                      <path d="m20 121 95 55 86-50" strokeDasharray="3 4" opacity=".5" />
                    </g>
                  </svg>
                  <span className="hs-glabel">COURTYARD STUDY · NTS</span>
                </div>
                <figcaption className="hs-cap">
                  explore space &amp; light <span className="hs-chk">↗</span>
                </figcaption>
              </figure>

              <div className="hs-card hs-sticky">
                <span className="hs-pin" />
                <div className="hs-kicker">Studio checklist</div>
                <ul>
                  <li className="done"><span className="hs-box">✓</span><span>Read the brief</span></li>
                  <li className="done"><span className="hs-box">✓</span><span>Explore the site</span></li>
                  <li><span className="hs-box" /><span>Sketch concepts</span></li>
                  <li><span className="hs-box" /><span>Test a model</span></li>
                </ul>
              </div>

              <div className="hs-card hs-chat">
                <div className="hs-dots"><i /><i /><i /></div>
                <div className="hs-bubble q">
                  How could light shape this space?
                </div>
                <div className="hs-bubble a">
                  Sketch a side window and a roof opening in section. Compare where light falls and what to test next.
                </div>
                <span className="hs-srctag">▦ example studio conversation</span>
              </div>

              <div className="hs-card hs-formula">
                <span className="hs-pin hs-pin--pen" />
                <div className="hs-formula-lbl">design prompt</div>
                <div className="hs-formula-eq">3 ideas</div>
                <div className="hs-formula-sub">one brief, new paths</div>
              </div>
            </div>
          </section>

          {/* PIPELINE */}
          <section className="hs-pipeline-sec">
            <div className="hs-pipeline">
              <div className="hs-pipeline-grid">
                <div className="hs-pl-copy">
                  <span className="hs-pl-label">how your tutor thinks</span>
                  <h2>
                    Personalize your <span className="hs-hl"><span>learning.</span></span>
                  </h2>
                  <p>
                    Start with your assignment, explore possibilities, and decide what to test through sketches and models.
                  </p>
                </div>
                <div className="hs-agents" aria-label="teaching pipeline">
                  <article className="hs-agent s1">
                    <div className="hs-agent-id">STEP 01 · BRIEF</div>
                    <div className="hs-agent-t">Read the source</div>
                    <p>Add your assignment and review its requirements before exploring ideas.</p>
                  </article>
                  <span className="hs-arrow-cx" aria-hidden />
                  <article className="hs-agent s2">
                    <div className="hs-agent-id">STEP 02 · PLAN</div>
                    <div className="hs-agent-t">Explore design options</div>
                    <p>Use site, light, movement, and form to explore different approaches.</p>
                  </article>
                  <span className="hs-arrow-cx" aria-hidden />
                  <article className="hs-agent s3">
                    <div className="hs-agent-id">STEP 03 · CHECK</div>
                    <div className="hs-agent-t">Sketch, then reflect</div>
                    <p>Try a sketch or model, compare your options, and record what you learn.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* TOOLS */}
          <section className="hs-tools">
            <div className="hs-tools-head">
              <h2>Your architecture workspace.</h2>
              <p>learn a concept, develop a project, or manage your settings.</p>
            </div>
            <div className="hs-tools-grid">
              <Link to="/learning" className="hs-tool">
                <span className="hs-tab">/learning</span>
                <div className="hs-ic">∴</div>
                <h3>Learning Mode</h3>
                <p>Ask about architecture or try a short design exercise at your own pace.</p>
                <span className="hs-go">Start learning <span className="hs-arrow">→</span></span>
              </Link>
              <Link to="/studio" className="hs-tool">
                <span className="hs-tab">/studio</span>
                <div className="hs-ic">✓</div>
                <h3>Studio Brainstorm</h3>
                <p>Upload your brief, explore concepts, and prepare for your next critique.</p>
                <span className="hs-go">Open Studio <span className="hs-arrow">→</span></span>
              </Link>
              <Link to="/profile" className="hs-tool">
                <span className="hs-tab">/profile</span>
                <div className="hs-ic">☺</div>
                <h3>My profile</h3>
                <p>Manage your account, language, and appearance. Your Studio notes stay in this browser.</p>
                <span className="hs-go">Open profile <span className="hs-arrow">→</span></span>
              </Link>
            </div>
          </section>
        </div>

        {/* ACES YOUR EXAMS */}
        <footer className="hs-acefoot">
          <div className="hs-acefoot-inner">
            <div className="hs-acefoot-grid">
              <div>
                <span className="hs-ace-eyebrow">prepare for your next critique</span>
                <h2>Develop Your Design.</h2>
                <p className="hs-ace-sub">Your brief, your ideas, one workspace.</p>
                {user ? (
                  <Link to="/learning" className="hs-btn-create">
                    Continue learning <span>→</span>
                  </Link>
                ) : (
                  <button type="button" className="hs-btn-create" onClick={() => setShowSignIn(true)}>
                    Create free account <span>→</span>
                  </button>
                )}
                <div className="hs-ace-meta">© 2026 AI Tutor · equal education for everyone</div>
              </div>
              <aside className="hs-ace-checklist" aria-label="studio review checklist">
                <div className="hs-ace-grade">A+</div>
                <h3>before your critique</h3>
                <ul>
                  <li>Brief reviewed</li>
                  <li>Concepts explored</li>
                  <li>Drawings and questions prepared</li>
                </ul>
              </aside>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
