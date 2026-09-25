import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import itemsRoutes from './routes/items.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Application = express();

// Middleware Konfigurasi CORS
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Selamat Datang di Thrivo API' });
});

// Mounting Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);

// Error Middleware Terpusat
app.use(errorHandler);

// Support Serverless Deployment (Vercel) & Local Server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
}

export default app;