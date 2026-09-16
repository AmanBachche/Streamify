import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Music } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import GhostFibers from '../components/effects/GhostFibers';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(); 
    navigate('/');
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
          {/* Toggle Tabs */}
          <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-2xl">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all" 
                required 
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-all" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Social Login</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <Music size={20} className="text-white" />
            </button>
            <button className="flex-1 flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;