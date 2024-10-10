import express from 'express';
import userController from '../controllers/user.js';
import jwt from '../middlewares/jwt.js';

const app = express();

app.get('/me', jwt.verifyUser, userController.getUserInfos);

app.get('/books', jwt.verifyUser, userController.getUserBooks);

export default app;
