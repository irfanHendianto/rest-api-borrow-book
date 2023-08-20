import config from '../constants/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL, // Menggunakan URL dari variabel lingkungan
    },
  },
});

export default prisma;
