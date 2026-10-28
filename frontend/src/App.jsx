import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Ruta inicial */}
        <Route
          path="/"
          element={<Navigate to="/games" replace />}
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={<h1>404 - Página no encontrada</h1>}
        />
      </Routes>
    </>
  );
}
