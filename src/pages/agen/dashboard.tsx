import { useState } from 'react';
import { Sidebar } from '../../components/agen/sidebar';
import { ScannerSection } from '../../components/agen/scannerSection';
import { TransactionForm } from '../../components/agen/transactionForm';

export default function DashboardAgen() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const handleScanSuccess = (code: string) => {
    setScannedCode(code);
  };

  const handleCancel = () => {
    setScannedCode(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Scan Barcode Masyarakat</h1>
          {scannedCode ? (
            <TransactionForm scannedCode={scannedCode} onCancel={handleCancel} />
          ) : (
            <ScannerSection onScanSuccess={handleScanSuccess} />
          )}
        </div>
      </main>
    </div>
  );
}