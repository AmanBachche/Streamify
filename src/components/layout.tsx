import { Outlet } from 'react-router-dom';
import { AeroShards } from '../effects/AeroShards';
import { GlowCursor } from '../effects/GlowCursor';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-primary/30">
      <AeroShards />
      <GlowCursor />
      <div className="flex">
        <main className="flex-1 min-h-screen relative overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;