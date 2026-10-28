
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="site-logo">
          <span className="logo-icon">🎮</span>
          <span>Game<span className="logo-accent">Shelf</span></span>
        </Link>

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/games" className="nav-link">
                Mi biblioteca
              </NavLink>

              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Iniciar sesión
              </NavLink>

              <Link to="/register" className="nav-register">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
