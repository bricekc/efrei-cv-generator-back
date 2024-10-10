import express from 'express';
import apiRouter from './routes/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors'
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const app = express();

app.use(cors())

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0'
    },
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerjsdoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

mongoose
  .connect(process.env.DATABSE_URL)
  .then(async () => {
    console.log('Database connected');
    const db = mongoose.connection.db;
    const collection = await db.listCollections().toArray();
    console.log('Collections : ', collection);
  })
  .catch((err) => {
    console.log(`Error on database connection ${err}`);
  });

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello world express');
});

app.listen(3000, () => {
  console.log('Server is running');
});
