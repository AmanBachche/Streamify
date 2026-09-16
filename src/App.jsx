import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout"; // Matches your lowercase filename
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Search from "./pages/Search"; // Make sure this file exists in src/pages
import AlbumDetail from "./pages/AlbumDetail"; // Make sure this file exists in src/pages

function App() {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login Route */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Auth onLogin={() => setIsAuthenticated(true)} />
          } 
        />

        {/* 2. Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Layout /> : 
            <Navigate to="/login" replace />
          }
        >
          {/* Home Dashboard */}
          <Route index element={<Home />} />
          
          {/* Real Search Page */}
          <Route path="search" element={<Search />} /> 
          
          {/* New Album Detail Page (clicking an album card takes you here) */}
          <Route path="album/:id" element={<AlbumDetail />} /> 
          
          <Route path="artists" element={<div className="p-10 text-4xl font-black italic">Artists Area</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;