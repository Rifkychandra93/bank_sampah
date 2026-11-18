import { useState } from 'react';
import { Sidebar } from '../../components/agen/sidebar';
import { ScannerSection } from '../../components/agen/scannerSection';
import { TransactionForm } from '../../components/agen/transactionForm';
import { ThemeToggle } from '../../context/ThemeContext';
import { Menu, ScanLine } from 'lucide-react';

export default function DashboardAgen() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleScanSuccess = (code: string) => {
    setScannedCode(code);
  };

  const handleCancel = () => {
    setScannedCode(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Agent Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Buka Menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Timbangan & Scan QR
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">
                  Pos Kelurahan Sukamaju • Layanan Timbang Langsung
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Siap Timbang</span>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800 mb-1">
              <ScanLine size={14} />
              <span>Penerimaan Setoran Sampah</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Scan Barcode / QR ID Nasabah
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Pindai kode QR dari layar HP nasabah atau kartu digital untuk memulai penimbangan.
            </p>
          </div>

          {scannedCode ? (
            <TransactionForm scannedCode={scannedCode} onCancel={handleCancel} />
          ) : (
            <ScannerSection onScanSuccess={handleScanSuccess} />
          )}
        </main>
      </div>
    </div>
  );
}
