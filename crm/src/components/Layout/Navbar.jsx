import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">CRM Dashboard</Link>
      </div>
      {user && (
        <div className="navbar-menu">
          <div className="navbar-item">
            <span>Bienvenido, {user.email}</span>
          </div>
          <div className="navbar-item">
            <button onClick={logout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;