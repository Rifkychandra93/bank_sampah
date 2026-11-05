import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf} from 'lucide-react';
import { LoginForm } from '../../components/auth/loginForm';

export default function Login() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          style={{
            transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`w-full max-w-sm flex flex-col items-center ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <Link to="/">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-sm">
              <Leaf size={20} className="stroke-[2.2] text-emerald-400" />
            </div>
            </Link>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Selamat Datang di EcoTrust
            </h1>

            <p className="text-xs text-slate-500 mt-1.5">
              Belum punya akun nasabah?{' '}
              <a href="#daftar" className="underline underline-offset-4 hover:text-emerald-700 font-medium">
                Daftar sekarang
              </a>
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-[11px] text-slate-400 leading-relaxed max-w-xs">
            Dengan melanjutkan, Anda menyetujui{' '}
            <a href="#" className="underline underline-offset-4 hover:text-slate-600">
              Ketentuan Layanan
            </a>{' '}
            dan{' '}
            <a href="#" className="underline underline-offset-4 hover:text-slate-600">
              Kebijakan Privasi
            </a>{' '}
            EcoTrust.
          </p>
        </div>
      </main>

      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 text-center text-[11px] text-slate-400">
        Hak Cipta © 2026 EcoTrust Digital Indonesia.
      </footer>
    </div>
  );
}
