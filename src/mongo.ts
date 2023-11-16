import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.82gad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

export const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(connectionString);
    console.log('Base de datos conectada');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
