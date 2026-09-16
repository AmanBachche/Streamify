import { Home, Search, Mic2, Album, Heart, PlusCircle, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Mic2, label: 'Artists', path: '/artists' },
  { icon: Album, label: 'Albums', path: '/albums' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
];

const Sidebar = () => {
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

      <div className="mt-auto p-4 rounded-2xl bg-white/5 flex items-center gap-3 border border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
          <div className="w-full h-full bg-surface rounded-full flex items-center justify-center text-xs font-bold">AZ</div>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-bold truncate">Aman</p>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Premium</p>
        </div>
        <Settings size={16} className="text-gray-500 cursor-pointer" />
      </div>
    </aside>
  );
};

export default Sidebar;