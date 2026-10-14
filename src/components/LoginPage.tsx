import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('annie.stanley@rizza.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email, password)) {
      setError('Please enter a valid demo credential (e.g. annie.stanley@rizza.com / demo123)');
    }
  };

  const handleQuickDemo = () => {
    login('annie.stanley@rizza.com', 'demo123');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-box">
        {/* Logo */}
        <div className="login-brand">
          <img src="/assets/rizza-header-logo.png" alt="Rizza" className="login-logo-img" />
          <p className="login-brand-tagline">AI-Native Verified Talent Marketplace</p>
        </div>

        {/* Demo Credentials Info Banner */}
        <div className="demo-credentials-banner">
          <div className="demo-badge">DEMO ACCESS</div>
          <p className="demo-info-text">
            Demo account configured for <strong>Annie Stanley (Senior UX Designer)</strong>. Credentials are saved locally.
          </p>
        </div>

        {error && <div className="login-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                className="text-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                className="text-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary login-submit-btn">
            <span>Sign In to Platform</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* 1-Click Fast Login */}
        <button className="quick-candidate-btn" onClick={handleQuickDemo}>
          <img
            src="/assets/annie-nav-avatar.png"
            alt="Annie"
            className="quick-avatar"
          />
          <div className="quick-btn-text">
            <span className="quick-title">1-Click Sign In as Annie Stanley</span>
            <span className="quick-subtitle">Candidate · UX Designer · Mumbai</span>
          </div>
          <Sparkles size={16} className="quick-sparkle" />
        </button>

        <div className="login-footer-security">
          <ShieldCheck size={14} />
          <span>Local storage session enabled. Zero backend required.</span>
        </div>
      </div>

      <style>{`
        .login-page-wrapper {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .login-card-box {
          background: #FFFFFF;
          border: 1px solid #ECEEF6;
          border-radius: 28px;
          padding: 38px 40px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 12px 36px -4px rgba(88, 50, 230, 0.1);
        }

        .login-brand {
          text-align: center;
          margin-bottom: 24px;
        }

        .login-logo-img {
          height: 44px;
          margin: 0 auto 8px auto;
          display: block;
        }

        .login-brand-tagline {
          font-size: 13.5px;
          color: #727B94;
          font-weight: 500;
        }

        .demo-credentials-banner {
          background: #F5F3FF;
          border: 1px solid #E8E2FB;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 22px;
        }

        .demo-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #5832E6;
          background: #FFFFFF;
          border: 1px solid #E2DAFB;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 6px;
        }

        .demo-info-text {
          font-size: 12.5px;
          color: #4C556E;
          line-height: 1.45;
        }

        .login-error-alert {
          background: #FFF1F2;
          color: #E11D48;
          border: 1px solid #FECDD3;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 12.5px;
          margin-bottom: 16px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #4C556E;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #7E88A2;
        }

        .text-input {
          width: 100%;
          height: 44px;
          border: 1.5px solid #DCE1EE;
          border-radius: 12px;
          padding: 0 16px 0 42px;
          font-size: 14px;
          color: #111625;
          outline: none;
          transition: all 0.15s;
        }
        .text-input:focus {
          border-color: #5832E6;
          box-shadow: 0 0 0 3px rgba(88, 50, 230, 0.12);
        }

        .login-submit-btn {
          width: 100%;
          height: 46px;
          font-size: 14.5px;
          margin-top: 6px;
        }

        .login-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 20px 0;
          color: #8C96AD;
          font-size: 11.5px;
          font-weight: 600;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #E8EBF4;
        }
        .login-divider span {
          padding: 0 12px;
        }

        /* 1-Click Fast Button */
        .quick-candidate-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FAF8FE;
          border: 1.5px solid #E4DCFA;
          border-radius: 14px;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .quick-candidate-btn:hover {
          background: #F3EEFE;
          border-color: #5832E6;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(88, 50, 230, 0.15);
        }

        .quick-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #5832E6;
        }

        .quick-btn-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .quick-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #5832E6;
        }
        .quick-subtitle {
          font-size: 11px;
          color: #727B94;
        }

        .quick-sparkle {
          color: #5832E6;
        }

        .login-footer-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: #8C96AD;
          margin-top: 24px;
        }
      `}</style>
    </div>
  );
};
