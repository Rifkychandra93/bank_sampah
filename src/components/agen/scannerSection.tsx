import { Scanner } from '@yudiel/react-qr-scanner';

interface ScannerSectionProps {
  onScanSuccess: (code: string) => void;
}

export function ScannerSection({ onScanSuccess }: ScannerSectionProps) {
  const handleScan = (result: any) => {
    if (result && result.length > 0) {
      onScanSuccess(result[0].rawValue);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="text-center mb-6 space-y-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Arahkan Kamera ke QR Code Nasabah
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Posisikan barcode atau kode QR dari kartu digital aplikasi nasabah tepat di tengah kotak pemindai kamera.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border-4 border-dashed border-emerald-300 dark:border-emerald-700/60 bg-slate-50 dark:bg-slate-800/50">
        <Scanner
          onScan={handleScan}
          onError={(error) => console.log(error?.message)}
          components={{ torch: true, zoom: true }}
        />
      </div>

      {/* Manual Quick Demo Scan */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Uji Coba Cepat:</span>
        <button
          type="button"
          onClick={() => onScanSuccess('USER-123456')}
          className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
        >
          Simulasikan Scan ID: USER-123456 (Rifky)
        </button>
      </div>
    </div>
  );
}
