import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GhostFibers from '../components/effects/GhostFibers';
import { createAuth, saveAuth, clearAuth, NAVIDROME_URL } from '../services/navidromeAuth';
import { ping } from '../services/navidromeApi';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverUrl, setServerUrl] = useState(NAVIDROME_URL);
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsConnecting(true);
    const auth = createAuth(username, password, serverUrl);

    try {
      saveAuth(auth);
      await ping();
      onLogin(auth);
      navigate('/', { replace: true });
    } catch (connectionError) {
      clearAuth();
      const message = connectionError.message || '';
      setError(
        connectionError instanceof TypeError || /failed to fetch|networkerror/i.test(message)
          ? 'Cannot reach Navidrome. Check the public server address, HTTPS, and Navidrome CORS settings.'
          : message || 'Could not connect to Navidrome.'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GhostFibers lineColor="#1A1A2E" glowColor="#7C3AED" speed={0.1} scale={1.2} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.5)] mb-4">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Streamify</h1>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="url"
                placeholder="https://music.example.com"
                autoComplete="url"
                value={serverUrl}
                onChange={(event) => setServerUrl(event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all"
                required
              />
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Navidrome username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="Navidrome password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all" 
                required 
              />
            </div>

            {error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

            <button 
              type="submit" 
              disabled={isConnecting}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
            >
              {isConnecting ? 'Connecting…' : 'Connect to Navidrome'}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">Enter the public Navidrome address (HTTPS for remote access), then use an account created on that server.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;