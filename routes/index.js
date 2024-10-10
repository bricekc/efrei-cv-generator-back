import express from 'express';
import bookRouter from './book.js';
import authRouter from './auth.js';
import userRouter from './user.js';

const app = express();

app.use('/books', bookRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

export default app;
