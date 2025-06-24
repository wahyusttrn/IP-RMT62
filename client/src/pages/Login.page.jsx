import { useState } from 'react';
import { TCh2, TCp } from '@/components/Typography';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle login logic
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6 border border-gray-200"
      >
        <TCh2 className="mb-2 text-center">
          Sign in to <b>Shred</b>
        </TCh2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button type="submit" className="mt-2 flex items-center justify-center gap-2">
          <LogIn size={18} /> Login
        </Button>
        <TCp className="text-center text-gray-500 text-sm mt-2">
          Don&apos;t have an account?{' '}
          <a href="#" className="underline hover:text-gray-700">
            Sign up
          </a>
        </TCp>
      </form>
    </main>
  );
}
