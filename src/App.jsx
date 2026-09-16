import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout"; 
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="search" element={<div className="p-10 text-4xl">Search Area</div>} />
          <Route path="artists" element={<div className="p-10 text-4xl">Artists Area</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;