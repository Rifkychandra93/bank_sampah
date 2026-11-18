import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/loginForm';
import { Logo } from '../../components/common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';

export default function Login() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Top Navbar Bar with Brand and ThemeToggle */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 flex items-center justify-between">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo imgClassName="h-8 w-auto" />
        </Link>
        <ThemeToggle />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          style={{
            transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`w-full max-w-md bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Masuk ke Bank Sampah
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pilih peran akun atau masukkan email terdaftar Anda
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs">
            Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi Bank Sampah EcoTrust.
          </p>
        </div>
      </main>

      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 text-center text-[11px] text-slate-400 dark:text-slate-500">
        Hak Cipta © 2026 Bank Sampah EcoTrust Indonesia.
      </footer>
    </div>
  );
}
