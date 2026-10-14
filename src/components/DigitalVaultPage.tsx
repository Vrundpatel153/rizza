import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, FileCheck, CheckCircle2, Upload, 
  ExternalLink, Eye, ArrowRight, Key, Sparkles, AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DigitalVaultPage: React.FC = () => {
  const { showToast, setActiveView } = useApp();
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const documents = [
    {
      id: 'doc-1',
      title: 'National Identity Proof (Passport / Aadhaar)',
      issuer: 'Government Authority',
      type: 'Identity Verification',
      status: 'Verified',
      hash: 'sha256-e9a4f...88c2',
      date: 'Verified Jan 2026'
    },
    {
      id: 'doc-2',
      title: 'B.Des in Interaction Design Degree',
      issuer: 'IDC School of Design, IIT Bombay',
      type: 'Education Credential',
      status: 'Verified',
      hash: 'sha256-42b71...99d1',
      date: 'Verified Jan 2026'
    },
    {
      id: 'doc-3',
      title: 'Senior UX Designer Experience Certificate',
      issuer: 'InVision Technologies Inc.',
      type: 'Employment Verification',
      status: 'Verified',
      hash: 'sha256-88f12...33a0',
      date: 'Verified Feb 2026'
    },
    {
      id: 'doc-4',
      title: 'Last 3 Months Salary Slips & Tax Summary',
      issuer: 'Figma Payroll Systems',
      type: 'Compensation Proof',
      status: 'Verified',
      hash: 'sha256-31c89...00b4',
      date: 'Verified Sep 2026'
    }
  ];

  const handleAcceptOffer = () => {
    setIsOfferAccepted(true);
    showToast('Offer letter e-signed with encrypted cryptographic signature!');
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Vault Column */}
      <div className="min-w-0 w-full flex flex-col gap-4">
        {/* Banner Card */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
              <ShieldCheck size={14} />
              <span>Digital Verification Vault (C-62 to C-68)</span>
            </div>
            <h1 className="text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
              Encrypted Credentials Vault
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xl">
              All identity records, university degrees, and verified payroll records are encrypted with 256-bit AES encryption. Share tamper-proof credentials with employers in 1 click.
            </p>
          </div>

          <button
            onClick={() => showToast('Opening secure document upload dialog')}
            className="px-4 py-2.5 rounded-xl bg-[#5828F0] hover:bg-[#4D1FE0] text-white text-xs font-bold flex items-center gap-2 shadow-[0_4px_14px_rgba(88,40,240,0.35)] cursor-pointer self-start sm:self-auto transition-all"
          >
            <Upload size={14} />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Verified Documents Checklist */}
        <div className="flex flex-col gap-3.5">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="p-5 sm:p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D6D0F2] transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {doc.issuer} • <span className="text-[#5828F0] font-medium">{doc.type}</span>
                  </p>
                  <p className="font-mono text-[10.5px] text-[#94A3B8] mt-1">
                    SHA-256: {doc.hash}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <CheckCircle2 size={12} />
                  <span>{doc.status}</span>
                </span>
                <button
                  onClick={() => showToast(`Previewing verified copy of: ${doc.title}`)}
                  className="p-2 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-white text-[#475569] hover:text-[#5828F0] transition-colors cursor-pointer"
                  title="View Document"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Offer Letter Review & E-Signing Section (C-69 / C-70) */}
        <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                Active Offer Letter: Senior UX Designer @ Stripe
              </h2>
            </div>
            <span className="text-xs font-bold text-[#5828F0] bg-[#EDE9FE] px-3 py-1 rounded-full">
              Ready for E-Sign
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F7FD] border border-[#ECE7F8] flex flex-col gap-2 text-xs text-[#475569] leading-relaxed">
            <p className="font-semibold text-[#0F172A]">
              Position: Senior UX Designer · Platform Billing &amp; Growth Core
            </p>
            <p>
              Annual Base Salary: <span className="font-bold text-[#0F172A]">$195,000 USD</span> + Equity Package ($60,000 RSUs vesting over 4 years) + Comprehensive Health &amp; Wellness.
            </p>
            <p>
              Start Date: <span className="font-bold text-[#0F172A]">December 1, 2026</span> · Remote / San Francisco, CA.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#ECE7F8]">
            <span className="text-xs text-[#64748B]">Cryptographically verified via Rizza Vault</span>

            <button
              onClick={handleAcceptOffer}
              disabled={isOfferAccepted}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isOfferAccepted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-[#5828F0] hover:bg-[#4D1FE0] text-white shadow-[0_4px_14px_rgba(88,40,240,0.35)] active:scale-95'
              }`}
            >
              {isOfferAccepted ? (
                <>
                  <CheckCircle2 size={14} />
                  <span>Offer E-Signed &amp; Accepted!</span>
                </>
              ) : (
                <>
                  <Key size={14} />
                  <span>Accept &amp; E-Sign Offer (C-70)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        {/* Security Summary Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-[#5828F0]" />
            <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
              Vault Protection
            </h3>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed mb-4">
            Documents stored here can only be accessed by verified employers you explicitly authorize during the interview process.
          </p>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">Encryption Standard</span>
              <span className="font-mono font-bold text-[#0F172A]">AES-256 GCM</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#ECE7F8]">
              <span className="text-[#64748B]">KYC Compliance</span>
              <span className="font-bold text-emerald-600">Passed Tier 3</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#64748B]">Active Authorizations</span>
              <span className="font-bold text-[#5828F0]">Figma, Stripe</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Card */}
        <div className="p-6 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)] flex flex-col gap-3">
          <h4 className="text-[14px] font-bold text-[#0F172A]">Next Career Steps</h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Keep your employment timeline updated to maintain higher recruiter match rankings.
          </p>
          <button
            onClick={() => setActiveView('employment-details')}
            className="w-full py-2.5 rounded-xl bg-[#F8F7FD] border border-[#ECE7F8] hover:bg-[#F3EFFC] text-xs font-bold text-[#5828F0] transition-colors cursor-pointer"
          >
            Review Employment Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
