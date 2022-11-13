import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser'
import { routerAuth } from './router/auth';

const app: Application = express();
const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.82gad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

const openServer = (): boolean => {

  const PORT = process.env.PORT || 3003;

  app.use(cors());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(bodyparser.json());


  app.use('/api/user', routerAuth);

  app.use((req, res) => {
    res.status(400).end();
  });

  try {
    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`);
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Base de datos conectada');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const startServer = async () => {
  let responseDdConnection = await dbConnection();
  responseDdConnection && (await openServer());

};


startServer();
