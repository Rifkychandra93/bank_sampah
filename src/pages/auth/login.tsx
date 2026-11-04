import { LoginOptions } from '../../components/auth/loginOptions';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-eco-bg px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-eco-light/30">
        <h1 className="text-2xl font-bold text-center text-eco-dark mb-8">Pilih Mode Demo</h1>
        <LoginOptions />
      </div>
    </div>
  );
}