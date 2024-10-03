import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import colors from 'colors';
import employeeRoutes from './routes/employee';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/employee', employeeRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgBlue));
