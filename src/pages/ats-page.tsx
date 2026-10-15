import { useState } from 'react';
import { SlidersHorizontal, Users, Video, ArrowRight, Check, X, Shield, Sparkles, Filter, MoreHorizontal, UserCheck } from 'lucide-react';
import { DemoUser, AtsCandidate } from '../model';

export function AtsPage({ user, patch, notify }: { user: DemoUser; patch: (fn: (u: DemoUser) => DemoUser) => void; notify: (s: string) => void }) {
  const [activeVideo, setActiveVideo] = useState<AtsCandidate | null>(null);
  const [dna, setDna] = useState(user.dnaWeights || { mustHaves: 40, culture: 25, autonomy: 20, motivation: 15 });

  const stages: AtsCandidate['stage'][] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

  const moveCandidate = (id: string, nextStage: AtsCandidate['stage']) => {
    patch(u => ({
      ...u,
      atsCandidates: u.atsCandidates.map(c => c.id === id ? { ...c, stage: nextStage } : c)
    }));
    notify(`Candidate moved to ${nextStage} stage.`);
  };

  const updateDna = (key: keyof typeof dna, val: number) => {
    const updated = { ...dna, [key]: val };
    setDna(updated);
    patch(u => ({ ...u, dnaWeights: updated }));
  };

  return (
    <div className="content-width">
      <div className="page-head">
        <div>
          <div className="eyebrow">EMPLOYER SUITE · FLOW 3 & 4 (E-15 TO E-46)</div>
          <h1>ATS Candidate Pipeline & Job DNA Studio</h1>
          <p>Define multi-signal hiring weights, review AI-matched candidates, stream 1-minute video pitches, and orchestrate interview scorecards.</p>
        </div>
        <div className="ats-job-selector">
          <span>Active Requisition:</span>
          <strong>Senior Product Designer · Linear</strong>
        </div>
      </div>

      {/* Job DNA Signal Weight Matrix (E-30 & E-31) */}
      <div className="panel job-dna-panel">
        <div className="section-head">
          <div>
            <div className="eyebrow">JOB DNA SIGNAL WEIGHT MATRIX</div>
            <h2>Candidate Match Scoring Engine</h2>
            <p>Adjust criteria weights to rank candidate profiles by what your team prioritizes today.</p>
          </div>
          <button className="quiet-btn" onClick={() => notify('Job DNA template saved as default')}>
            Save DNA Template
          </button>
        </div>

        <div className="dna-sliders-grid">
          <div className="dna-slider-item">
            <div className="slider-label">
              <span>Must-Have Skills</span>
              <strong>{dna.mustHaves}%</strong>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={dna.mustHaves}
              onChange={e => updateDna('mustHaves', Number(e.target.value))}
            />
            <small>Figma, Design Systems, Mobile Craft</small>
          </div>

          <div className="dna-slider-item">
            <div className="slider-label">
              <span>Culture & Behavioral Fit</span>
              <strong>{dna.culture}%</strong>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={dna.culture}
              onChange={e => updateDna('culture', Number(e.target.value))}
            />
            <small>Curiosity, Kind Critique, Empathy</small>
          </div>

          <div className="dna-slider-item">
            <div className="slider-label">
              <span>Ownership & Autonomy</span>
              <strong>{dna.autonomy}%</strong>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={dna.autonomy}
              onChange={e => updateDna('autonomy', Number(e.target.value))}
            />
            <small>Self-directed, 0-to-1 Shipping</small>
          </div>

          <div className="dna-slider-item">
            <div className="slider-label">
              <span>Motivation Alignment</span>
              <strong>{dna.motivation}%</strong>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={dna.motivation}
              onChange={e => updateDna('motivation', Number(e.target.value))}
            />
            <small>Developer tooling, High-trust UX</small>
          </div>
        </div>
      </div>

      {/* Kanban ATS Pipeline (E-37) */}
      <div className="ats-kanban-board">
        {stages.map(stage => {
          const inStage = user.atsCandidates.filter(c => c.stage === stage);
          return (
            <div key={stage} className="kanban-column" data-testid={`kanban-column-${stage.toLowerCase()}`}>
              <div className="kanban-col-head">
                <span className="col-title">{stage}</span>
                <span className="col-count">{inStage.length}</span>
              </div>

              <div className="kanban-cards-stack">
                {inStage.map(cand => (
                  <div key={cand.id} className="kanban-cand-card panel" data-testid={`card-candidate-${cand.id}`}>
                    <div className="cand-top-row">
                      <img src={cand.avatar} alt="" className="cand-avatar" />
                      <div>
                        <strong>{cand.name}</strong>
                        <small>{cand.role} · {cand.experience}</small>
                      </div>
                      <span className="cand-match-pill">{cand.matchScore}%</span>
                    </div>

                    <p className="cand-fit-summary">{cand.fitSummary}</p>

                    <div className="pills cand-strengths">
                      {cand.keyStrengths.map(st => (
                        <span key={st} className="pill">{st}</span>
                      ))}
                    </div>

                    <div className="cand-actions-row">
                      {cand.hasVideoPitch && (
                        <button
                          className="video-pitch-trigger"
                          onClick={() => setActiveVideo(cand)}
                          data-testid={`button-video-pitch-${cand.id}`}
                        >
                          <Video size={13} /> 1-Min Pitch
                        </button>
                      )}

                      <div className="stage-advance-buttons">
                        {stage !== 'Hired' && (
                          <button
                            className="advance-btn"
                            onClick={() => {
                              const nextIdx = stages.indexOf(stage) + 1;
                              moveCandidate(cand.id, stages[nextIdx]);
                            }}
                            title="Move to next stage"
                          >
                            Advance <ArrowRight size={12} />
                          </button>
                        )}
                        {stage === 'Hired' && (
                          <span className="hired-badge"><UserCheck size={13} /> Offer Signed</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {inStage.length === 0 && (
                  <div className="kanban-empty-drop">
                    <span>No candidates in {stage}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Pitch Modal (E-51) */}
      {activeVideo && (
        <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setActiveVideo(null); }}>
          <div className="modal video-player-modal">
            <div className="modal-head">
              <div>
                <div className="eyebrow">1-MINUTE VIDEO PITCH · {activeVideo.name.toUpperCase()}</div>
                <h2>Candidate Video Introduction</h2>
              </div>
              <button className="icon-btn" onClick={() => setActiveVideo(null)} aria-label="Close"><X size={16} /></button>
            </div>

            <div className="video-player-content">
              <div className="video-mock-screen">
                <img src="/images/annie-portrait.png" alt="" className="video-preview-still" />
                <div className="video-overlay-badge">
                  <span>● 00:58 / 01:00 · 1080p HD</span>
                </div>
                <div className="video-captions">
                  “Hi, I'm {activeVideo.name}. At FinMate, I focused on turning user friction during KYC into high-trust moments. I'm excited by how Linear balances velocity with quiet craft.”
                </div>
              </div>

              <div className="video-scorecard-row">
                <div>
                  <strong>Communication & Articulation</strong>
                  <small>Clear, authentic, grounded in product trade-offs</small>
                </div>
                <span className="badge-pill">Score: 9.6 / 10</span>
              </div>

              <div className="form-actions">
                <button type="button" className="quiet-btn" onClick={() => setActiveVideo(null)}>Close Player</button>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => {
                    moveCandidate(activeVideo.id, 'Interview');
                    setActiveVideo(null);
                  }}
                >
                  Schedule Interview Round <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
