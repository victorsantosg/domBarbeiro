import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client';
import dotenv from 'dotenv';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
const { PrismaClient } = pkg;

dotenv.config();

const app = express();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- BARBERS ---
app.get('/api/barbers', async (req, res) => {
  try {
    const barbers = await prisma.barber.findMany();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVICES ---
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- APPOINTMENTS ---
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        barber: true
      },
      orderBy: [
        { appointmentDate: 'asc' },
        { appointmentTime: 'asc' }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  const { clientName, clientPhone, serviceId, barberId, appointmentDate, appointmentTime } = req.body;
  try {
    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientPhone,
        serviceId,
        barberId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: 'scheduled'
      }
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
