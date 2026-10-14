import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const EditFieldModal: React.FC = () => {
  const { isEditFieldModalOpen, editingField, closeEditFieldModal, updateEmploymentField } = useApp();
  const [val, setVal] = useState('');

  useEffect(() => {
    if (editingField) {
      setVal(editingField.value);
    }
  }, [editingField]);

  if (!isEditFieldModalOpen || !editingField) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim()) {
      updateEmploymentField(editingField.key, val.trim());
      closeEditFieldModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeEditFieldModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3 className="modal-title">Edit {editingField.label}</h3>
          <button className="modal-close-btn" onClick={closeEditFieldModal}>✕</button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-field">
            <label className="modal-label">{editingField.label}</label>
            <input
              type="text"
              className="modal-input"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              autoFocus
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={closeEditFieldModal}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(17, 22, 37, 0.45);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-dialog {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 26px;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
          border: 1px solid #ECEEF6;
          animation: fadeIn 0.15s ease-out;
        }

        .modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #111625;
        }

        .modal-close-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #727B94;
          font-size: 15px;
          transition: background 0.15s;
        }
        .modal-close-btn:hover {
          background: #F4F5FB;
          color: #111625;
        }

        .modal-field {
          margin-bottom: 24px;
        }

        .modal-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: #555E75;
          margin-bottom: 8px;
        }

        .modal-input {
          width: 100%;
          height: 44px;
          border: 1.5px solid #DCE1EE;
          border-radius: 10px;
          padding: 0 14px;
          font-size: 14.5px;
          color: #111625;
          outline: none;
          transition: all 0.15s;
        }
        .modal-input:focus {
          border-color: #5832E6;
          box-shadow: 0 0 0 3px rgba(88, 50, 230, 0.12);
        }

        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};
