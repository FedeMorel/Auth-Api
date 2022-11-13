const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.82gad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

export const dbConnection = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Base de datos conectada');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
