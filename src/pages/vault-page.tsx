import { useState } from 'react';
import { ShieldCheck, Lock, FileCheck, Award, CheckCircle2, ArrowRight, Eye, Download, PenTool, Check, Clock, AlertCircle } from 'lucide-react';
import { DemoUser, Offer, VaultItem } from '../model';

export function VaultPage({ user, patch, notify }: { user: DemoUser; patch: (fn: (u: DemoUser) => DemoUser) => void; notify: (s: string) => void }) {
  const [signModal, setSignModal] = useState<Offer | null>(null);
  const [signatureName, setSignatureName] = useState(user.profile.name);
  const [agreed, setAgreed] = useState(false);

  const activeOffer = user.offers[0];

  const handleSign = (offerId: string) => {
    if (!agreed) {
      notify('Please agree to the verified offer terms before signing.');
      return;
    }
    patch(u => ({
      ...u,
      offers: u.offers.map(o => o.id === offerId ? { ...o, status: 'Accepted', signedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : o),
      notifications: [
        {
          id: `notice-${Date.now()}`,
          title: 'Offer Accepted & E-Signed!',
          body: `You officially accepted the Staff Product Designer offer at ${activeOffer?.company || 'Linear'}. Welcome aboard!`,
          date: 'Just now',
          unread: true
        },
        ...u.notifications
      ]
    }));
    setSignModal(null);
    notify(`Congratulations! Offer with ${activeOffer?.company || 'Linear'} officially e-signed & accepted.`);
  };

  return (
    <div className="content-width">
      <div className="page-head">
        <div>
          <div className="eyebrow">DIGITAL VAULT & VERIFICATION · FLOW 6</div>
          <h1>Encrypted Vault & Verified Offers</h1>
          <p>End-to-end encrypted storage for verified government credentials, academic degrees, and official e-signed offer letters.</p>
        </div>
        <div className="vault-security-pill">
          <ShieldCheck size={16} /> AES-256 Bit Encrypted · SOC2 Compliant
        </div>
      </div>

      {/* Active Offer Banner */}
      {activeOffer && (
        <div className={`panel offer-hero-card ${activeOffer.status === 'Accepted' ? 'offer-accepted' : ''}`}>
          <div className="offer-hero-top">
            <div className="offer-company-badge">
              <span className="offer-logo">L</span>
              <div>
                <span className="eyebrow">OFFICIAL OFFER LETTER · READY FOR E-SIGNATURE</span>
                <h2>{activeOffer.role} at {activeOffer.company}</h2>
              </div>
            </div>
            <span className={`offer-status-badge ${activeOffer.status === 'Accepted' ? 'status-confirmed' : 'status-pending'}`}>
              {activeOffer.status === 'Accepted' ? <><CheckCircle2 size={14} /> Signed & Confirmed</> : <><Clock size={14} /> Pending Signature</>}
            </span>
          </div>

          <div className="offer-compensation-grid">
            <div className="comp-item">
              <small>BASE SALARY</small>
              <strong>{activeOffer.salary}</strong>
            </div>
            <div className="comp-item">
              <small>EQUITY GRANT</small>
              <strong>{activeOffer.equity}</strong>
            </div>
            <div className="comp-item">
              <small>LOCATION & TIMEZONE</small>
              <strong>{activeOffer.location}</strong>
            </div>
            <div className="comp-item">
              <small>DECISION DEADLINE</small>
              <strong>{activeOffer.deadline}</strong>
            </div>
          </div>

          <div className="offer-terms-summary">
            <h4>Key Offer Provisions & Benefits</h4>
            <ul>
              {activeOffer.terms.map((t, idx) => (
                <li key={idx}><Check size={14} /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="offer-hero-actions">
            {activeOffer.status === 'Accepted' ? (
              <div className="signed-confirmation-bar">
                <CheckCircle2 size={16} /> Signed by {user.profile.name} on {activeOffer.signedDate || 'Today'}. Document archived to vault.
              </div>
            ) : (
              <button
                className="primary-btn glow-btn"
                onClick={() => setSignModal(activeOffer)}
                data-testid="button-open-esign-modal"
              >
                <PenTool size={16} /> Review & E-Sign Offer Letter <ArrowRight size={15} />
              </button>
            )}
            <button className="quiet-btn" onClick={() => notify('Downloading cryptographic PDF copy...')}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Verified Credentials Vault Grid */}
      <div className="vault-section-title">
        <div>
          <div className="eyebrow">VERIFIED IDENTITY & BACKGROUND CHECK</div>
          <h2>Document Credential Vault</h2>
        </div>
        <button className="quiet-btn" onClick={() => notify('Encrypted file upload window opened')}>
          + Upload document
        </button>
      </div>

      <div className="vault-grid">
        {user.vault.map(item => (
          <div key={item.id} className="vault-item-card panel" data-testid={`card-vault-${item.id}`}>
            <div className="vault-card-head">
              <span className={`vault-category-pill cat-${item.category.toLowerCase()}`}>{item.category}</span>
              <span className={`vault-status-chip status-${item.status.toLowerCase().replace(' ', '-')}`}>
                {item.status === 'Verified' ? <CheckCircle2 size={12} /> : <Lock size={12} />}
                {item.status}
              </span>
            </div>

            <h3 className="vault-item-title">{item.title}</h3>

            <div className="vault-item-details">
              <div>
                <small>ISSUING BODY</small>
                <span>{item.issuer}</span>
              </div>
              <div>
                <small>REFERENCE / ID</small>
                <code>{item.documentNumber}</code>
              </div>
            </div>

            <div className="vault-card-footer">
              <span className="vault-date"><FileCheck size={13} /> {item.verifiedDate}</span>
              <button
                className="quiet-btn"
                onClick={() => notify(`Viewing verified audit record for ${item.title}`)}
                aria-label={`View ${item.title}`}
              >
                <Eye size={13} /> Audit Log
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* E-Sign Modal */}
      {signModal && (
        <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSignModal(null); }}>
          <div className="modal esign-modal">
            <div className="modal-head">
              <div>
                <div className="eyebrow">LEGAL E-SIGNATURE · VERIFIED CREDENTIAL</div>
                <h2>Execute Employment Contract</h2>
              </div>
              <button className="icon-btn" onClick={() => setSignModal(null)} aria-label="Close"><ArrowRight size={16} /></button>
            </div>

            <div className="esign-body">
              <div className="contract-preview-box">
                <h4>EMPLOYMENT AGREEMENT SUMMARY</h4>
                <p>This binding agreement is made between <strong>{signModal.company} Inc.</strong> and <strong>{user.profile.name}</strong> for the role of <strong>{signModal.role}</strong>.</p>
                <div className="contract-terms-box">
                  <p>• Annual base compensation: <strong>{signModal.salary}</strong></p>
                  <p>• Equity option allotment: <strong>{signModal.equity}</strong></p>
                  <p>• Location arrangement: <strong>{signModal.location}</strong></p>
                  <p>• IP Assignment & Confidentiality: Standard verified technology assignment.</p>
                </div>
              </div>

              <div className="signature-input-group">
                <label>
                  <span>Type Full Legal Name for Digital Signature</span>
                  <input
                    value={signatureName}
                    onChange={e => setSignatureName(e.target.value)}
                    placeholder="e.g. Annie Stanley"
                    data-testid="input-signature-name"
                  />
                </label>

                <div className="signature-preview-stamp">
                  <small>E-SIGNATURE STAMP</small>
                  <div className="signature-font">{signatureName || 'Your Signature'}</div>
                  <span className="cert-hash">SHA-256 · Timestamp: {new Date().toISOString().slice(0, 10)}</span>
                </div>

                <label className="checkbox-agree-label">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    data-testid="checkbox-agree-terms"
                  />
                  <span>I declare under penalty of perjury that I am {user.profile.name} and I accept the terms of employment with {signModal.company}.</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="quiet-btn" onClick={() => setSignModal(null)}>Cancel</button>
                <button
                  type="button"
                  className="primary-btn glow-btn"
                  disabled={!agreed || !signatureName.trim()}
                  onClick={() => handleSign(signModal.id)}
                  data-testid="button-confirm-esign"
                >
                  <CheckCircle2 size={16} /> Execute & Accept Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
