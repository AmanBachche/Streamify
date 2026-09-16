import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout"; // Matches your lowercase filename
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";

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

        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Layout /> : 
            <Navigate to="/login" replace />
          }
        >
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="albums" element={<Albums />} />
          <Route path="album/:id" element={<AlbumDetail />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artist/:id" element={<ArtistDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;