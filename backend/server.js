import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import customerRoutes from './routes/customers.js';
import membershipsRoutes from './routes/memberships.js';

import cors from 'cors';

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/memberships', membershipsRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});