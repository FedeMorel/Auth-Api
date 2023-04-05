import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyparser from 'body-parser'
import { dbConnection } from './mongo';
import express, { application, Application } from 'express';
import { routerUser } from './router/user.router';
import { routerPost } from './router/post.router';
import { routerComment } from './router/comment.router';
dotenv.config();


const app: Application = express();

const openServer = (): boolean => {

  const PORT = process.env.PORT || 3003;

  app.use(cors());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(bodyparser.json());

  app.get('/', (req, res) => {
    res.redirect("https://invited-mind-087.notion.site/Auth-Api-6c9830a2848b413283eccfdfa90ab79d")
  });

  app.use('/api/user', routerUser);

  app.use('/api/post', routerPost);

  app.use('/api/comment', routerComment);

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