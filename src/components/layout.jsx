import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import GhostFibers from './effects/GhostFibers';
import { GlowCursor } from './effects/GlowCursor';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden text-white">
      {/* 1. Background Effect */}
      <div className="fixed inset-0 z-0">
        <GhostFibers
          lineColor="#1A1A2E"
          glowColor="#7C3AED" // Your Purple Glow
          speed={0.1}
          scale={1.5}
          layers={5}
          vignette={0.9}
        />
      </div>

      {/* 2. Global Effects */}
      <GlowCursor />
      <Sidebar />

      {/* 3. Content */}
      <main className="lg:pl-72 min-h-screen relative z-10">
        <div className="p-10 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;