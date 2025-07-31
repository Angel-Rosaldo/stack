import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useAuth } from '../../context/AuthContext';
import contactsService from '../../services/contacts';

Chart.register(...registerables);

const ContactsChart = () => {
  const { token } = useAuth();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await contactsService.getContacts(token);
        
        // Procesar datos para el gráfico (ejemplo: contactos por mes)
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const currentMonth = new Date().getMonth();
        const lastMonths = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
        
        const data = lastMonths.map(month => {
          return contacts.filter(contact => {
            const contactDate = new Date(contact.fecha);
            return contactDate.getMonth() === months.indexOf(month);
          }).length;
        });

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: lastMonths,
              datasets: [{
                label: 'Contactos por Mes',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Error generating chart:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="chart-container">
      <h3>Respuestas por Mes</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ContactsChart;