import StatsCard from '../components/Dashboard/StatsCard';
import ContactsChart from '../components/Dashboard/ContactsChart';
import RecentContacts from '../components/Dashboard/RecentContacts';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard CRM - Leads del Curso</h1>
      
      <StatsCard />
      <ContactsChart />
      <RecentContacts />
    </div>
  );
};

export default DashboardPage;