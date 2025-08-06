import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import companyRoutes from './routes/company.routes.js';
import contentRoutes from './routes/content.routes.js';
import evaluationRoutes from './routes/evaluation.routes.js';
import progressRoutes from './routes/progress.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error('❌ Error connecting to MongoDB:', err));
