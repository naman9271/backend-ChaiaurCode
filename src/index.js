console.log('Starting the application...');
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import { app } from './app.js';

dotenv.config({
  path: './.env',
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    ('DB connection failed', err);
  });
