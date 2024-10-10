import express from 'express';
import cvController from '../controllers/cv.js';
import jwt from '../middlewares/jwt.js';
const app = express();

app.get('/', cvController.findAll);
app.get('/:id', jwt.verifyUser, cvController.findOne);
app.post('/', jwt.verifyUser, cvController.create);
app.put('/:id', jwt.verifyUser, cvController.update);
app.delete('/:id', jwt.verifyUser, cvController.delete);

export default app;