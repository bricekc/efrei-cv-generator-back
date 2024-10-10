import express from 'express';
import authController from '../controllers/auth.js';

const app = express();

app.post('/register', authController.register);

app.post('/login', authController.login);

export default app;
