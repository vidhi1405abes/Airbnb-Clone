import express from 'express';
import cors from 'cors';
import { listingRouter } from './routes/listing.js';
import { reservationsRouter } from './routes/reservations.js';
import { reviewsRouter } from './routes/reviews.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'airbnb-clone-api'
  });
});

// Mount modular routers
app.use('/api/listing', listingRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/reviews', reviewsRouter);

// Fallback 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Airbnb Clone API server running on http://localhost:${PORT}`);
});

export default app;
