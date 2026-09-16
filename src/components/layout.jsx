import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar'; // Points to the Sidebar file in the layout folder
import { AeroShards } from './effects/AeroShards'; // Points to the file we just renamed
import { GlowCursor } from './effects/GlowCursor';

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AeroShards />
      <GlowCursor />
      <Sidebar />
      <main className="lg:pl-72 min-h-screen relative z-10">
        <div className="p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;