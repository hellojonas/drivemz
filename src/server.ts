import dotenv from 'dotenv';

dotenv.config({
  path: './config.env',
});

import app from './app';
import mongoose from 'mongoose';

process.on('uncaughtException', err => {
  console.error(err);
  console.log('UNCAUGHT EXCEPTION, SHUTTING DOWN.');
  server.close();
});

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'));

const server = app.listen(process.env.PORT, () =>
  console.log('App Listening on Port: ' + process.env.PORT)
);

process.on('SIGTERM', () => {
  server.close();
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error(err);
  console.log('UNHANDLED REJECTION, SHUTTING DOWN.');
  server.close();
});
