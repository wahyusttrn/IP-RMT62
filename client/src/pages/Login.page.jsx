import { useEffect } from 'react';
import { TCh2, TCp } from '@/components/Typography';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router';
import { main_server } from '@/helpers/http-client';

export default function Login() {
  // const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function handleCredentialResponse(response) {
      try {
        const { data } = await main_server.post('/login/google', {
          token: response.credential
        });
        //! toast
        localStorage.setItem('access_token', data.access_token);
        navigate('/collections');
      } catch (error) {
        //! toast
        console.log(error);
      }
    }

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
      theme: 'outline',
      size: 'large'
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <form className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6 border border-gray-200">
        <TCh2 className="mb-2 text-center">
          Sign in to <b>Shred</b>
        </TCh2>
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
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
        </Button> */}

        <div className="flex items-center justify-center">
          <div id="googleSignIn" />
        </div>

        {/* <TCp className="text-center text-gray-500 text-sm mt-2">
          Don&apos;t have an account?{' '}
          <Link to={'/register'} className="underline hover:text-gray-700">
            Sign up
          </Link>
        </TCp> */}
      </form>
    </main>
  );
}
