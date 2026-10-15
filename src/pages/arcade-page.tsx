import { useState } from 'react';
import { Trophy, Flame, Users, Clock, Award, Star, ArrowRight, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import { DemoUser, Challenge, seedLeaderboard } from '../model';

export function ArcadePage({ user, patch, notify }: { user: DemoUser; patch: (fn: (u: DemoUser) => DemoUser) => void; notify: (s: string) => void }) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [submitLink, setSubmitLink] = useState('');
  const [submitNotes, setSubmitNotes] = useState('');
  const [tab, setTab] = useState<'challenges' | 'leaderboard' | 'badges'>('challenges');

  const handleSubmit = (challengeId: string) => {
    if (!submitLink.trim()) {
      notify('Please provide a Figma or prototype URL.');
      return;
    }
    patch(u => ({
      ...u,
      challenges: u.challenges.map(c => c.id === challengeId ? { ...c, userSubmitted: true, participants: c.participants + 1 } : c),
      notifications: [
        {
          id: `notice-${Date.now()}`,
          title: 'Challenge Submission Received!',
          body: `Your submission for "${selectedChallenge?.title}" is under review by ${selectedChallenge?.sponsor}.`,
          date: 'Just now',
          unread: true
        },
        ...u.notifications
      ]
    }));
    setSelectedChallenge(null);
    setSubmitLink('');
    setSubmitNotes('');
    notify('Challenge solution submitted to the leaderboard!');
  };

  return (
    <div className="content-width">
      <div className="page-head">
        <div>
          <div className="eyebrow">GAMIFIED HIRING & CHALLENGES · FLOW 7</div>
          <h1>Brand Arcade & Competitions</h1>
          <p>Compete in employer-sponsored design challenges, climb the global creator leaderboards, and get scouted directly by hiring teams.</p>
        </div>
        <div className="arcade-xp-pill">
          <Trophy size={16} /> <strong>2,840 XP</strong> · Rank #4 Worldwide
        </div>
      </div>

      {/* Tabs */}
      <div className="arcade-tabs">
        {[
          ['challenges', 'Active Challenges'],
          ['leaderboard', 'Global Leaderboards'],
          ['badges', 'Badges & Achievements']
        ].map(([key, label]) => (
          <button
            key={key}
            className={`arcade-tab ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key as any)}
            data-testid={`tab-arcade-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'challenges' && (
        <div className="challenges-grid">
          {user.challenges.map(ch => (
            <div key={ch.id} className="challenge-card panel" data-testid={`card-challenge-${ch.id}`}>
              <div className="challenge-card-top">
                <span className="challenge-sponsor-pill">{ch.sponsor}</span>
                <span className="challenge-days-left">
                  <Clock size={12} /> {ch.daysLeft} days left
                </span>
              </div>

              <h3 className="challenge-title">{ch.title}</h3>
              <p className="challenge-desc">{ch.description}</p>

              <div className="challenge-meta-row">
                <div className="prize-chip">
                  <Flame size={13} />
                  <span>{ch.prize}</span>
                </div>
                <div className="participants-chip">
                  <Users size={13} />
                  <span>{ch.participants} designers</span>
                </div>
              </div>

              <div className="pills challenge-tags">
                {ch.tags.map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>

              <div className="challenge-card-footer">
                <span className="reward-badge-tag">
                  <Award size={12} /> Reward: {ch.rewardBadge}
                </span>
                {ch.userSubmitted ? (
                  <button className="quiet-btn submitted-btn" disabled>
                    <Check size={14} /> Submitted
                  </button>
                ) : (
                  <button
                    className="primary-btn"
                    onClick={() => setSelectedChallenge(ch)}
                    data-testid={`button-enter-challenge-${ch.id}`}
                  >
                    Enter Challenge <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'leaderboard' && (
        <div className="panel leaderboard-panel">
          <div className="section-head">
            <div>
              <div className="eyebrow">TOP 1% PRODUCT TALENT</div>
              <h2>Global Design Arena Standings</h2>
            </div>
            <span className="badge-pill">Season 4 Active</span>
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-head">
              <span>RANK</span>
              <span>DESIGNER</span>
              <span>EXPERIENCE XP</span>
              <span>TIER</span>
              <span>BADGES</span>
            </div>
            {seedLeaderboard.map(entry => (
              <div
                key={entry.rank}
                className={`leaderboard-row ${entry.name.includes('Annie') ? 'current-user-row' : ''}`}
                data-testid={`row-leaderboard-${entry.rank}`}
              >
                <span className="rank-num">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#0${entry.rank}`}
                </span>
                <div className="designer-info">
                  <img src={entry.avatar} alt="" className="leaderboard-avatar" />
                  <div>
                    <strong>{entry.name}</strong>
                    <small>{entry.role}</small>
                  </div>
                </div>
                <span className="score-val">{entry.score.toLocaleString()} XP</span>
                <span className={`tier-badge tier-${entry.tier.toLowerCase()}`}>{entry.tier}</span>
                <span className="badges-count">🏆 {entry.badges}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'badges' && (
        <div className="badges-grid">
          {[
            ['Linear Speed Grandmaster', 'Awarded for sub-second keyboard-first triage solutions', 'Tier 1 Verified'],
            ['AI Systems Pioneer', 'Architected multi-model infinite canvas interaction flows', 'Verified Credential'],
            ['STAR Storyteller', 'Published 2+ comprehensive STAR narrative case studies', 'Profile Mastery'],
            ['90th Percentile Benchmark', 'Scored top 10% in the Rizza technical assessment', 'Signal Badge'],
            ['High-Trust Fintech Architect', 'Designed compliant multi-step banking authentication journeys', 'Domain Badge']
          ].map(([title, desc, tag]) => (
            <div key={title} className="panel badge-card">
              <span className="badge-icon"><Award size={26} /></span>
              <span className="badge-tier-tag">{tag}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      {selectedChallenge && (
        <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedChallenge(null); }}>
          <div className="modal challenge-modal">
            <div className="modal-head">
              <div>
                <div className="eyebrow">SUBMIT YOUR SOLUTION · {selectedChallenge.sponsor.toUpperCase()}</div>
                <h2>{selectedChallenge.title}</h2>
              </div>
              <button className="icon-btn" onClick={() => setSelectedChallenge(null)} aria-label="Close"><ArrowRight size={16} /></button>
            </div>

            <div className="challenge-submit-form">
              <p className="submit-intro">
                Submissions are judged directly by hiring managers and design leads at <strong>{selectedChallenge.sponsor}</strong>. High scores receive priority interview invitations.
              </p>

              <label>
                <span>Interactive Prototype or Figma URL</span>
                <input
                  value={submitLink}
                  onChange={e => setSubmitLink(e.target.value)}
                  placeholder="https://www.figma.com/proto/..."
                  data-testid="input-challenge-link"
                />
              </label>

              <label>
                <span>Design Rationale & Trade-offs (Short Note)</span>
                <textarea
                  rows={4}
                  value={submitNotes}
                  onChange={e => setSubmitNotes(e.target.value)}
                  placeholder="Explain why your interaction reduces latency and cognitive friction..."
                  data-testid="textarea-challenge-notes"
                />
              </label>

              <div className="form-actions">
                <button type="button" className="quiet-btn" onClick={() => setSelectedChallenge(null)}>Cancel</button>
                <button
                  type="button"
                  className="primary-btn glow-btn"
                  disabled={!submitLink.trim()}
                  onClick={() => handleSubmit(selectedChallenge.id)}
                  data-testid="button-confirm-challenge-submit"
                >
                  <Send size={15} /> Submit for Judging
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
