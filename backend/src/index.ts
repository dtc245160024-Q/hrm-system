import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import authRoutes from './routes/authRoutes';
import departmentRoutes from './routes/departmentRoutes';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Khai báo các Routes
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HRM Backend is running with Employees Module!' });
});

app.listen(port, async () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
  await connectDB();
});
