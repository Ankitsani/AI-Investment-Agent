import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import researchRoutes from './routes/researchRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Express middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup (Optional / Graceful fallback)
let db = null;
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  MongoClient.connect(MONGO_URI)
    .then(client => {
      console.log('✅ Connected to MongoDB successfully.');
      db = client.db('investment_agent');
      app.locals.db = db;
    })
    .catch(err => {
      console.warn('⚠️ MongoDB connection failed. Continuing without database history storage:', err.message);
    });
} else {
  console.log('ℹ️ No MONGO_URI provided in environment. Running with in-memory caching/session tracking.');
}

// API Routes
app.use('/api', researchRoutes);
app.get('/', (req, res) => {
  res.send('🚀 AI Investment Research Server is running!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    apis: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GOOGLE_API_KEY,
      tavily: !!process.env.TAVILY_API_KEY,
      news_api: !!process.env.NEWS_API_KEY
    }
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 AI Investment Research Server running on http://localhost:${PORT}`);
});
