import React, { useState, useEffect } from 'react';
import './Booking.css';
import { 
  getServices, 
  getBarbers,
  getProducts, 
  createAppointment 
} from '../../utils/api';
import { 
  MdContentCut, 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdPhone,
  MdShoppingCart,
  MdCheckCircle
} from 'react-icons/md';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    serviceId: '',
    barberId: '',
    appointmentDate: '',
    appointmentTime: '',
    clientName: '',
    clientPhone: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesData, productsData, barbersData] = await Promise.all([
        getServices(),
        getProducts(),
        getBarbers()
      ]);
      setServices(servicesData || []);
      setProducts(productsData || []);
      setBarbers(barbersData || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(formData);
      setSuccess(true);
    } catch (error) {
      alert('Erro ao agendar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="booking-container success-screen">
        <MdCheckCircle className="success-icon" />
        <h1>Agendado com Sucesso!</h1>
        <p>O barbeiro já recebeu sua solicitação. Te esperamos lá!</p>
        <button onClick={() => window.location.reload()} className="btn-primary">Voltar</button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <header className="booking-header">
        <img src="/logo.jpeg" alt="Don Barbeiro" className="booking-logo" />
        <p>Agende seu horário em segundos</p>
      </header>

      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4</div>
      </div>

      <form onSubmit={handleBooking} className="booking-form">
        {step === 1 && (
          <section className="booking-step">
            <h2><MdContentCut /> Escolha o Serviço</h2>
            <div className="services-grid horizontal">
              {services.map(service => (
                <div 
                  key={service.id} 
                  className={`service-card-horizontal ${formData.serviceId === service.id ? 'selected' : ''}`}
                  onClick={() => {
                    setFormData({...formData, serviceId: service.id});
                    setStep(2);
                  }}
                >
                  {service.imageUrl && (
                    <div className="service-img-container">
                      <img src={service.imageUrl} alt={service.name} />
                    </div>
                  )}
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <span className="price">R$ {service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="booking-step">
            <h2><MdPerson /> Escolha o Barbeiro</h2>
            <div className="barbers-grid">
              {barbers.map(barber => (
                <div 
                  key={barber.id} 
                  className={`barber-card ${formData.barberId === barber.id ? 'selected' : ''}`}
                  onClick={() => {
                    setFormData({...formData, barberId: barber.id});
                    setStep(3);
                  }}
                >
                  <img src={barber.imageUrl} alt={barber.name} className="barber-img" />
                  <h3>{barber.name}</h3>
                  <p>{barber.specialty}</p>
                </div>
              ))}
            </div>
            <div className="nav-btns">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary">Voltar</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="booking-step">
            <h2><MdCalendarToday /> Data e Hora</h2>
            <div className="input-group">
              <label>Data</label>
              <input 
                type="date" 
                required 
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Horário</label>
              <select 
                required 
                onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              >
                <option value="">Selecione um horário</option>
                {/* Simulated availability based on barber */}
                {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="nav-btns">
              <button type="button" onClick={() => setStep(2)} className="btn-secondary">Voltar</button>
              <button type="button" onClick={() => setStep(4)} className="btn-primary" disabled={!formData.appointmentDate || !formData.appointmentTime}>Próximo</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="booking-step">
            <h2><MdPerson /> Seus Dados</h2>
            <div className="input-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Seu nome"
                required
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>WhatsApp</label>
              <input 
                type="tel" 
                placeholder="(00) 00000-0000"
                required
                onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
              />
            </div>

            <div className="shop-preview">
              <h3><MdShoppingCart /> Aproveite e conheça nossa loja</h3>
              <div className="products-mini-grid">
                {products.slice(0, 2).map(p => (
                  <div key={p.id} className="product-mini-card">
                    <img src={p.imageUrl || 'https://via.placeholder.com/100'} alt={p.name} />
                    <div>
                      <h4>{p.name}</h4>
                      <span>R$ {p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="nav-btns">
              <button type="button" onClick={() => setStep(3)} className="btn-secondary">Voltar</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Confirmando...' : 'Finalizar Agendamento'}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default Booking;
