import express from 'express';
import authRoutes from '@/modules/auth';
import bookRoutes from '@/modules/books';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.use(authRoutes);
app.use(bookRoutes);

export default app;