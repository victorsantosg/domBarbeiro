import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { 
  getAppointments, 
  updateAppointmentStatus 
} from '../../utils/api';
import { 
  MdOutlineDashboard, 
  MdEventNote, 
  MdAttachMoney, 
  MdPeopleOutline,
  MdCheckCircleOutline,
  MdShoppingCart,
  MdSchedule
} from 'react-icons/md';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    completedCuts: 0,
    activeClients: 0,
    pendingAppointments: 0
  });

  useEffect(() => {
    fetchAppointments();
    // In a real app with local server, you might use WebSockets for real-time.
    // For now, let's use a simple poll every 5 seconds.
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const calculateStats = (data) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = data.filter(app => app.appointmentDate.split('T')[0] === today);
    
    const revenue = todayAppointments
      .filter(app => app.status === 'completed')
      .reduce((acc, app) => acc + (parseFloat(app.service?.price) || 0), 0);

    const completed = todayAppointments.filter(app => app.status === 'completed').length;
    const pending = todayAppointments.filter(app => app.status === 'scheduled').length;

    setStats({
      totalRevenue: revenue,
      completedCuts: completed,
      activeClients: new Set(data.map(app => app.clientName)).size,
      pendingAppointments: pending
    });
  };

  const updateStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-div">
          <img src="/logo.jpeg" alt="Don Barbeiro" className="sidebar-logo" />
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active"><MdOutlineDashboard className="icon" /> Dashboard</li>
            <li><MdEventNote className="icon" /> Agenda</li>
            <li><MdShoppingCart className="icon" /> Lojinha</li>
            <li><MdPeopleOutline className="icon" /> Clientes</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard Administrativo</h1>
          <div className="user-info">
            <span>Bem-vindo, Dono</span>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <p>Receita Hoje</p>
              <h3>R$ {stats.totalRevenue.toFixed(2)}</h3>
            </div>
            <MdAttachMoney className="stat-icon revenue" />
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <p>Cortes Realizados</p>
              <h3>{stats.completedCuts}</h3>
            </div>
            <MdCheckCircleOutline className="stat-icon completed" />
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <p>Agendamentos Pendentes</p>
              <h3>{stats.pendingAppointments}</h3>
            </div>
            <MdSchedule className="stat-icon pending" />
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <p>Total Clientes</p>
              <h3>{stats.activeClients}</h3>
            </div>
            <MdPeopleOutline className="stat-icon clients" />
          </div>
        </section>

        {/* Real-time Queue */}
        <section className="queue-section">
          <h2>Fila de Agendamentos (Hoje)</h2>
          <div className="table-container">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Barbeiro</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map(app => (
                    <tr key={app.id}>
                      <td>{app.appointmentTime.slice(0, 5)}</td>
                      <td>{app.clientName}</td>
                      <td>{app.service?.name}</td>
                      <td>{app.barber?.name || 'Não selecionado'}</td>
                      <td>
                        <span className={`status-badge ${app.status}`}>
                          {app.status === 'scheduled' ? 'Agendado' : 
                           app.status === 'in-progress' ? 'Em corte' : 'Concluído'}
                        </span>
                      </td>
                      <td>
                        {app.status === 'scheduled' && (
                          <button onClick={() => updateStatus(app.id, 'in-progress')} className="btn-action start">Iniciar</button>
                        )}
                        {app.status === 'in-progress' && (
                          <button onClick={() => updateStatus(app.id, 'completed')} className="btn-action complete">Concluir</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum agendamento para hoje.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;