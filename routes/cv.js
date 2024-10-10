import express from 'express';
import cvController from '../controllers/cv.js';
import jwt from '../middlewares/jwt.js';
const app = express();

app.post('/', jwt.verifyUser, cvController.create);
export default app;