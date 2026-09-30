import { Home, Search, Mic2, Album, Heart, Play, Pause, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { getAuth } from '../../services/navidromeAuth';
import { usePlayer } from '../../context/PlayerContext';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Mic2, label: 'Artists', path: '/artists' },
  { icon: Album, label: 'Albums', path: '/albums' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
];

const Sidebar = ({ onLogout }) => {
  const auth = getAuth();
  const { currentTrack, isPlaying, togglePlayback, playbackError, progress, duration, seek, formatDuration } = usePlayer();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col p-6 z-40 hidden lg:flex">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Streamify</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon size={20} className={isActive ? 'text-primary' : ''} />
                <span className="font-medium relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {currentTrack && (
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <img src={currentTrack.cover} alt="" className="h-11 w-11 rounded-lg bg-white/10 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{currentTrack.title}</p>
              <p className="truncate text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
            <button onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'} className="rounded-full p-2 text-white hover:bg-primary">
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={Math.min(progress, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Track position"
            className="mt-3 w-full accent-violet-500"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>{formatDuration(progress)}</span><span>{formatDuration(duration)}</span>
          </div>
          {playbackError && <p role="status" className="mt-2 text-xs text-red-300">{playbackError}</p>}
        </div>
      )}

      <div className="mt-auto p-4 rounded-2xl bg-white/5 flex items-center gap-3 border border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
          <div className="w-full h-full bg-surface rounded-full flex items-center justify-center text-xs font-bold">{auth?.username?.slice(0, 2).toUpperCase() || 'ND'}</div>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-bold truncate">{auth?.username || 'Navidrome'}</p>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Connected</p>
        </div>
        <button onClick={onLogout} aria-label="Disconnect from Navidrome" title="Disconnect" className="rounded-lg p-2 text-gray-500 hover:bg-white/10 hover:text-white">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;