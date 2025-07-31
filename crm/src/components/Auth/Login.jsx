import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../CSS/Login.css'; // Asegúrate de tener un archivo CSS para estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>CRM Dashboard</h1>
        <p className="subtitle">Sistema de gestión de contactos y leads</p>
        <div className="divider"></div>
      </div>
      
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="········"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="divider"></div>
          
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;