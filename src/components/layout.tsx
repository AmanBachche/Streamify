import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-background text-white">
      {/* Background & Sidebar will go here later */}
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;