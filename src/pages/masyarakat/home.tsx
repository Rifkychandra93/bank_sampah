import { useState, useEffect } from 'react';
import { Navbar } from '../../components/masyarakat/navbar';
import { UserQrCode } from '../../components/masyarakat/userQrCode';

export default function HomeMasyarakat() {
  const userId = 'USER-123456';
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const savedBalance = localStorage.getItem('ecoBank_userBalance');
    if (savedBalance) {
      setBalance(Number(savedBalance));
    } else {
      localStorage.setItem('ecoBank_userBalance', '0');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <UserQrCode userId={userId} balance={balance} />
      </div>
    </div>
  );
}