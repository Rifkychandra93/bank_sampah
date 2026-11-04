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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-center text-gray-500 mb-6">
        Arahkan kamera laptop ke layar HP masyarakat yang menampilkan QR Code
      </p>
      <div className="overflow-hidden rounded-xl border-4 border-dashed border-eco-light bg-gray-50">
        <Scanner 
          onScan={handleScan} 
          onError={(error) => console.log(error?.message)}
          components={{ audio: true, torch: true, zoom: true }}
        />
      </div>
    </div>
  );
}