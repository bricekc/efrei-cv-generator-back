import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import cvRouter from './cv.js';

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/cv', cvRouter)

export default app;
