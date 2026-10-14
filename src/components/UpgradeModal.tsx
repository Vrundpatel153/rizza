import React from 'react';
import { Crown, Check, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UpgradeModal: React.FC = () => {
  const { isProModalOpen, setIsProModalOpen, showToast } = useApp();

  if (!isProModalOpen) return null;

  const handleUpgrade = () => {
    setIsProModalOpen(false);
    showToast('Upgraded to Rizza Pro Plan!');
  };

  const proFeatures = [
    'Verified Talent Badge on your profile & search results',
    'Unlimited Technical & Behavioral Assessments',
    'AI-powered STAR Storyteller & Portfolio Enhancer',
    'Global Percentile Benchmarking vs peer designers',
    'Direct priority messaging to hiring managers',
    'Custom vanity URL (rizza.life/yourname)'
  ];

  return (
    <div className="upgrade-modal-overlay" onClick={() => setIsProModalOpen(false)}>
      <div className="upgrade-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-crown-wrap">
          <Crown size={28} className="modal-crown-icon" />
        </div>

        <h2 className="modal-pro-title">Upgrade to Rizza Pro</h2>
        <p className="modal-pro-sub">
          Unlock high-velocity career growth with verified credentials and AI-driven matching.
        </p>

        <div className="pro-pricing-tag">
          <span className="price-num">$19</span>
          <span className="price-cadence">/ month</span>
        </div>

        <div className="pro-features-list">
          {proFeatures.map((feat, i) => (
            <div key={i} className="pro-feat-row">
              <div className="feat-check-wrap">
                <Check size={14} strokeWidth={2.8} />
              </div>
              <span className="feat-text">{feat}</span>
            </div>
          ))}
        </div>

        <div className="pro-actions">
          <button className="btn-secondary" onClick={() => setIsProModalOpen(false)}>
            Maybe later
          </button>
          <button className="btn-primary upgrade-confirm-btn" onClick={handleUpgrade}>
            <Zap size={16} />
            <span>Start 14-Day Free Trial</span>
          </button>
        </div>
      </div>

      <style>{`
        .upgrade-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(17, 22, 37, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .upgrade-modal-box {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 50px rgba(88, 50, 230, 0.16);
          border: 1px solid #ECEEF6;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-crown-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(88, 50, 230, 0.1);
          color: #5832E6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .modal-pro-title {
          font-size: 22px;
          font-weight: 800;
          color: #111625;
        }

        .modal-pro-sub {
          font-size: 13.5px;
          color: #6C758F;
          line-height: 1.5;
          margin: 6px auto 18px auto;
        }

        .pro-pricing-tag {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          background: #F8F7FD;
          border: 1px solid #E8E2FB;
          padding: 8px 20px;
          border-radius: 9999px;
          margin-bottom: 22px;
        }
        .price-num {
          font-size: 24px;
          font-weight: 800;
          color: #5832E6;
        }
        .price-cadence {
          font-size: 13px;
          color: #727B94;
          font-weight: 600;
        }

        .pro-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          margin-bottom: 28px;
        }

        .pro-feat-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: #384158;
        }

        .feat-check-wrap {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ECFDF5;
          color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .feat-text {
          line-height: 1.4;
        }

        .pro-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .upgrade-confirm-btn {
          flex: 1;
        }
      `}</style>
    </div>
  );
};
