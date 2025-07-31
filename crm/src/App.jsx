import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const PrivateWrapper = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter> {/* Router debe estar en el nivel más alto */}
      <AuthProvider> {/* Ahora AuthProvider está dentro de Router */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<PrivateWrapper />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;