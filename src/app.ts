import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Application } from 'express';
import { dbConnection } from './mongo';
import bodyparser from 'body-parser'
import { routerAuth } from './router/auth';

const app: Application = express();

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


const startServer = async () => {
  let responseDdConnection = await dbConnection();
  responseDdConnection && (await openServer());

};

startServer();
