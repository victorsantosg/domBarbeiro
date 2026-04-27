import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear old services to avoid duplicates for this demo
  await prisma.appointment.deleteMany();
  await prisma.barber.deleteMany();
  await prisma.service.deleteMany();

  await prisma.barber.createMany({
    data: [
      {
        name: 'Carlos Oliveira',
        specialty: 'Especialista em Degradê e Barba',
        imageUrl: '/barber1.png'
      },
      {
        name: 'Ricardo Santos',
        specialty: 'Especialista em Old Money e Tesoura',
        imageUrl: '/barber2.png'
      }
    ]
  });

  await prisma.service.createMany({
    data: [
      {
        name: 'Corte Degradê',
        description: 'Um clássico moderno com transição suave e linhas marcadas.',
        price: 45.00,
        durationMinutes: 45,
        imageUrl: '/degrade.png'
      },
      {
        name: 'Corte Old Money',
        description: 'Estilo clássico e elegante, com fluxo natural e visual atemporal.',
        price: 60.00,
        durationMinutes: 50,
        imageUrl: '/old_money.png'
      },
      {
        name: 'Corte Social',
        description: 'Corte tradicional e limpo para o dia a dia.',
        price: 35.00,
        durationMinutes: 30,
        imageUrl: '/social.png'
      },
      {
        name: 'Barba e Toalha Quente',
        description: 'Relaxamento total com navalha e hidratação.',
        price: 30.00,
        durationMinutes: 30,
        imageUrl: '/barba.png'
      }
    ]
  });

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Pomada Modeladora Premium',
        description: 'Fixação forte e efeito matte para todos os tipos de cabelo.',
        price: 45.00,
        stockQuantity: 20,
        imageUrl: '/pomada.png'
      },
      {
        name: 'Óleo para Barba Wood',
        description: 'Hidratação profunda com fragrância amadeirada exclusiva.',
        price: 35.00,
        stockQuantity: 15,
        imageUrl: '/oleo.png'
      },
      {
        name: 'Shampoo de Barba 200ml',
        description: 'Limpeza refrescante para os fios e a pele do rosto.',
        price: 30.00,
        stockQuantity: 25,
        imageUrl: '/shampoo.png'
      }
    ]
  });

  console.log('Products and Services updated successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
