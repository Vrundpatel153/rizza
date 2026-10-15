import { useState } from 'react';
import { Sparkles, Plus, Pencil, Trash2, ArrowRight, Check, Award, BookOpen, Compass, Lightbulb, ChevronRight, Target } from 'lucide-react';
import { DemoUser, StarStory } from '../model';

export function StoryPage({ user, patch, notify }: { user: DemoUser; patch: (fn: (u: DemoUser) => DemoUser) => void; notify: (s: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<StarStory | null>(null);
  const [activeModule, setActiveModule] = useState<'who' | 'skills' | 'done' | 'work' | 'next'>('who');

  const openNew = () => {
    setEditingStory({
      id: `star-${Date.now()}`,
      title: '',
      category: 'Product Design & Craft',
      company: user.experience[0]?.company || 'Independent',
      situation: '',
      task: '',
      action: '',
      result: '',
      reflection: '',
      metrics: '',
      featured: true
    });
    setModalOpen(true);
  };

  const openEdit = (story: StarStory) => {
    setEditingStory(story);
    setModalOpen(true);
  };

  const saveStory = (story: StarStory) => {
    if (!story.title.trim()) return;
    patch(u => {
      const exists = u.stories.some(s => s.id === story.id);
      return {
        ...u,
        stories: exists ? u.stories.map(s => s.id === story.id ? story : s) : [story, ...u.stories]
      };
    });
    setModalOpen(false);
    setEditingStory(null);
    notify('STAR Story saved to your Life Page');
  };

  const deleteStory = (id: string) => {
    if (window.confirm('Delete this story from your Life Page?')) {
      patch(u => ({ ...u, stories: u.stories.filter(s => s.id !== id) }));
      notify('Story removed');
    }
  };

  return (
    <div className="content-width">
      <div className="page-head">
        <div>
          <div className="eyebrow">CANDIDATE SUITE · FLOW 2</div>
          <h1>STAR Storyteller Studio</h1>
          <p>Your career is more than titles. Build verified narrative case studies following the Situation, Task, Action, Result framework.</p>
        </div>
        <button className="primary-btn" onClick={openNew} data-testid="button-create-star-story">
          <Plus size={16} /> Write a STAR story
        </button>
      </div>

      {/* 5 Living Life Page Modules Tabs */}
      <div className="story-module-nav">
        {[
          ['who', '01 · Who I Am', 'Values & Philosophy'],
          ['skills', "02 · What I'm Good At", 'Superpowers & Craft'],
          ['done', "03 · What I've Done", 'Flagship STAR Stories'],
          ['work', '04 · How I Work', 'Collaboration Style'],
          ['next', '05 · What I Want Next', 'Ideal Next Chapter']
        ].map(([key, label, desc]) => (
          <button
            key={key}
            className={`story-module-tab ${activeModule === key ? 'active' : ''}`}
            onClick={() => setActiveModule(key as any)}
            data-testid={`tab-story-module-${key}`}
          >
            <strong>{label}</strong>
            <small>{desc}</small>
          </button>
        ))}
      </div>

      {activeModule === 'who' && (
        <div className="panel story-module-panel">
          <div className="module-head">
            <span className="module-icon"><Compass size={20} /></span>
            <div>
              <div className="eyebrow">MODULE C-101</div>
              <h2>Who I Am · Core Values & Perspectives</h2>
              <p>The principles that guide how you solve problems, communicate with partners, and make design trade-offs.</p>
            </div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-num">01</span>
              <h3>Clarity Over Cleverness</h3>
              <p>Simple interfaces create trust. Complex enterprise domains should feel straightforward and intuitive without condescending to power users.</p>
            </div>
            <div className="value-card">
              <span className="value-num">02</span>
              <h3>Empathy for the Builders</h3>
              <p>Design is never finished until it's running in production. I build tight engineering partnerships and prioritize composable design tokens.</p>
            </div>
            <div className="value-card">
              <span className="value-num">03</span>
              <h3>Evidence-Backed Instinct</h3>
              <p>Data tells us where friction happens; qualitative customer inquiry reveals why. I balance rapid prototyping with rigorous metric tracking.</p>
            </div>
          </div>
        </div>
      )}

      {activeModule === 'skills' && (
        <div className="panel story-module-panel">
          <div className="module-head">
            <span className="module-icon"><Award size={20} /></span>
            <div>
              <div className="eyebrow">MODULE C-102</div>
              <h2>What I'm Good At · Craft & Verified Signals</h2>
              <p>Multi-dimensional breakdown of core competencies, backed by real shipped systems and peer endorsements.</p>
            </div>
          </div>
          <div className="craft-radar-grid">
            {user.skills.map(s => (
              <div key={s.id} className="craft-item">
                <div className="craft-label">
                  <strong>{s.name}</strong>
                  <span>{s.level} · {s.proficiency}%</span>
                </div>
                <div className="craft-track"><i style={{ width: `${s.proficiency}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeModule === 'done' && (
        <div className="story-feed">
          <div className="stories-header-line">
            <h2>{user.stories.length} Verified Flagship Stories</h2>
            <span className="badge-pill"><Sparkles size={12} /> AI Assisted & Verified</span>
          </div>

          <div className="star-cards-list">
            {user.stories.map(s => (
              <div key={s.id} className="star-story-card panel" data-testid={`card-star-${s.id}`}>
                <div className="star-card-top">
                  <div>
                    <span className="star-tag">{s.category} · {s.company}</span>
                    <h3>{s.title}</h3>
                  </div>
                  <div className="row-actions">
                    <button className="icon-btn" onClick={() => openEdit(s)} aria-label="Edit story">
                      <Pencil size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => deleteStory(s.id)} aria-label="Delete story">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="star-breakdown-grid">
                  <div className="star-phase s-phase">
                    <strong><span className="star-letter">S</span> Situation</strong>
                    <p>{s.situation}</p>
                  </div>
                  <div className="star-phase t-phase">
                    <strong><span className="star-letter">T</span> Task & Goal</strong>
                    <p>{s.task}</p>
                  </div>
                  <div className="star-phase a-phase">
                    <strong><span className="star-letter">A</span> Action Taken</strong>
                    <p>{s.action}</p>
                  </div>
                  <div className="star-phase r-phase">
                    <strong><span className="star-letter">R</span> Result & Impact</strong>
                    <p>{s.result}</p>
                  </div>
                </div>

                <div className="star-footer">
                  <div className="star-metric-chip">
                    <Target size={13} />
                    <span>{s.metrics}</span>
                  </div>
                  <div className="star-reflection">
                    <em>“{s.reflection}”</em>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeModule === 'work' && (
        <div className="panel story-module-panel">
          <div className="module-head">
            <span className="module-icon"><BookOpen size={20} /></span>
            <div>
              <div className="eyebrow">MODULE C-104</div>
              <h2>How I Work · Rituals & Collaboration</h2>
              <p>A transparent look at daily working rhythms, feedback habits, and sprint orchestration.</p>
            </div>
          </div>
          <div className="work-style-grid">
            <div className="style-card">
              <h4>Async-First Documentation</h4>
              <p>I write detailed Figma specs, Notion decision records, and Loom walkthroughs so teammates across timezones stay fully aligned without meeting fatigue.</p>
            </div>
            <div className="style-card">
              <h4>Collaborative Design Crits</h4>
              <p>Open critiques focused on "What is this trying to make easier?" rather than personal aesthetic debates. Rapid iteration in public.</p>
            </div>
            <div className="style-card">
              <h4>Continuous User Feedback</h4>
              <p>Running weekly unmoderated usability clips and maintaining a close feedback loop with customer success and solutions engineering teams.</p>
            </div>
          </div>
        </div>
      )}

      {activeModule === 'next' && (
        <div className="panel story-module-panel">
          <div className="module-head">
            <span className="module-icon"><Lightbulb size={20} /></span>
            <div>
              <div className="eyebrow">MODULE C-105</div>
              <h2>What I Want Next · The Ideal Problem Space</h2>
              <p>The domains, challenges, and team environments where I do my best work.</p>
            </div>
          </div>
          <div className="next-wishlist">
            <div className="wishlist-item">
              <span className="check-bullet"><Check size={14} /></span>
              <div>
                <strong>High-trust developer tools or fintech products</strong>
                <p>Spaces where latency, reliability, and precision matter deeply to users.</p>
              </div>
            </div>
            <div className="wishlist-item">
              <span className="check-bullet"><Check size={14} /></span>
              <div>
                <strong>Design-led engineering culture</strong>
                <p>Teams where craft is respected as a competitive moat and executives value polished user experiences.</p>
              </div>
            </div>
            <div className="wishlist-item">
              <span className="check-bullet"><Check size={14} /></span>
              <div>
                <strong>Remote or flexible hybrid flexibility</strong>
                <p>Async autonomy paired with focused quarterly in-person team retreats.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAR Story Builder Modal */}
      {modalOpen && editingStory && (
        <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="modal star-builder-modal">
            <div className="modal-head">
              <div>
                <div className="eyebrow">STAR STORYTELLER BUILDER · C-12 TO C-15</div>
                <h2>Shape your story with clarity</h2>
              </div>
              <button className="icon-btn" onClick={() => setModalOpen(false)} aria-label="Close"><ArrowRight size={16} /></button>
            </div>

            <div className="star-builder-form">
              <label>
                <span>Story Title</span>
                <input
                  value={editingStory.title}
                  onChange={e => setEditingStory({ ...editingStory, title: e.target.value })}
                  placeholder="e.g. Scaling Mobile Checkout to 10M Users"
                />
              </label>

              <div className="form-two">
                <label>
                  <span>Domain Category</span>
                  <input
                    value={editingStory.category}
                    onChange={e => setEditingStory({ ...editingStory, category: e.target.value })}
                    placeholder="e.g. Fintech UX"
                  />
                </label>
                <label>
                  <span>Company or Project</span>
                  <input
                    value={editingStory.company}
                    onChange={e => setEditingStory({ ...editingStory, company: e.target.value })}
                    placeholder="e.g. FinMate"
                  />
                </label>
              </div>

              <div className="star-steps-inputs">
                <label>
                  <span className="step-badge s-bg">S · SITUATION</span>
                  <small>What was the challenge or friction? What was broken before you joined?</small>
                  <textarea
                    rows={2}
                    value={editingStory.situation}
                    onChange={e => setEditingStory({ ...editingStory, situation: e.target.value })}
                    placeholder="e.g. Drop-off was high due to anxiety around data sharing..."
                  />
                </label>

                <label>
                  <span className="step-badge t-bg">T · TASK</span>
                  <small>What were you specifically responsible for achieving?</small>
                  <textarea
                    rows={2}
                    value={editingStory.task}
                    onChange={e => setEditingStory({ ...editingStory, task: e.target.value })}
                    placeholder="e.g. Redesign the entire identity verification pipeline..."
                  />
                </label>

                <label>
                  <span className="step-badge a-bg">A · ACTION</span>
                  <small>What specific decisions, user research, and prototypes did you champion?</small>
                  <textarea
                    rows={3}
                    value={editingStory.action}
                    onChange={e => setEditingStory({ ...editingStory, action: e.target.value })}
                    placeholder="e.g. Introduced progressively disclosed questions with real-time feedback..."
                  />
                </label>

                <label>
                  <span className="step-badge r-bg">R · RESULT & REFLECTION</span>
                  <small>What changed because you were there? (Metrics, team velocity, user feedback)</small>
                  <textarea
                    rows={2}
                    value={editingStory.result}
                    onChange={e => setEditingStory({ ...editingStory, result: e.target.value })}
                    placeholder="e.g. Completion jumped from 42% to 84%..."
                  />
                </label>

                <label>
                  <span>Key Metrics Chip</span>
                  <input
                    value={editingStory.metrics}
                    onChange={e => setEditingStory({ ...editingStory, metrics: e.target.value })}
                    placeholder="e.g. +42% onboarding completion · 96% CSAT"
                  />
                </label>

                <label>
                  <span>Personal Reflection / Core Takeaway</span>
                  <input
                    value={editingStory.reflection}
                    onChange={e => setEditingStory({ ...editingStory, reflection: e.target.value })}
                    placeholder="e.g. Specific clarity always beats generic polish."
                  />
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="quiet-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button
                  type="button"
                  className="primary-btn"
                  disabled={!editingStory.title.trim() || !editingStory.situation.trim()}
                  onClick={() => saveStory(editingStory)}
                >
                  <Check size={16} /> Save STAR Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
