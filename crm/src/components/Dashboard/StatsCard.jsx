import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import contactsService from '../../services/contacts';

const StatsCard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    monthlyAvg: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const contacts = await contactsService.getContacts(token);
        // Calcular estadísticas
        const total = contacts.length;
        const now = new Date();
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        
        const thisWeek = contacts.filter(contact => 
          new Date(contact.fecha) > oneWeekAgo
        ).length;
        
        const monthlyAvg = total / 12; // Ajustar según necesidad
        
        setStats({ total, thisWeek, monthlyAvg });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Contactos</h3>
        <p>{stats.total}</p>
      </div>
      
      <div className="stat-card">
        <h3>Esta Semana</h3>
        <p>{stats.thisWeek}</p>
      </div>
      
      <div className="stat-card">
        <h3>Promedio/Mes</h3>
        <p>{stats.monthlyAvg.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default StatsCard;