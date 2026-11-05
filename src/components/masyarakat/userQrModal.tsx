import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, ShieldCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface UserQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

export function UserQrModal({ isOpen, onClose, userId, userName }: UserQrModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
          <QrCode size={26} />
        </div>

        <h3 className="text-lg font-bold text-slate-900">QR Paspor Nasabah</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Tunjukkan kode ini ke petugas pos agen saat Anda menyetor sampah untuk verifikasi timbangan.
        </p>

        <div className="mt-5 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col items-center shadow-inner">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <QRCodeSVG value={userId} size={180} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200">
              {userId}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors"
              title="Salin ID"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="mt-5 w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">{userName}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <ShieldCheck size={14} /> Terverifikasi
          </span>
        </div>
      </div>
    </div>
  );
}

