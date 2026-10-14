import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="floating-toast fade-in">
      <CheckCircle2 size={16} className="toast-icon" />
      <span className="toast-text">{toastMessage}</span>

      <style>{`
        .floating-toast {
          position: fixed;
          top: 84px;
          right: 36px;
          background: #111625;
          color: #FFFFFF;
          padding: 10px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 1100;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .toast-icon {
          color: #10B981;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
