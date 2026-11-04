import { QRCodeSVG } from 'qrcode.react';

interface UserQrCodeProps {
  userId: string;
  balance: number;
}

export function UserQrCode({ userId, balance }: UserQrCodeProps) {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="text-center">
      <div className="bg-eco-green text-white p-4 rounded-xl mb-8 shadow-md">
        <p className="text-sm text-eco-light mb-1">Total Saldo Anda</p>
        <h2 className="text-3xl font-bold">{formatRupiah(balance)}</h2>
      </div>

      <h1 className="text-xl font-bold text-eco-dark mb-2">Tukar Sampah Anda</h1>
      <p className="text-gray-500 mb-6 text-sm">Tunjukkan QR Code ini ke Agen Bank Sampah</p>
      
      <div className="bg-white p-6 border-4 border-eco-green rounded-2xl w-fit mx-auto shadow-sm">
        <QRCodeSVG value={userId} size={200} />
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-xl">
        <p className="text-xs text-gray-400 mb-1">ID Pengguna</p>
        <p className="text-lg font-mono font-bold text-eco-dark tracking-wider">{userId}</p>
      </div>
    </div>
  );
}