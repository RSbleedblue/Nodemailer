import express, { json } from 'express';
import dotnenv from 'dotenv';
import userRouter from './routes/UserRoute.js';
import cors from 'cors';

dotnenv.config();
const app = express();
app.use(json());
app.use(cors());
app.use('/api',userRouter);

export default app;