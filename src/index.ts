import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

export const DBEnviroment = {
  development: {
    username: process.env.DEV_DB_USERNAME as string,
    password: process.env.DEV_DB_PASSWORD as string,
    database: process.env.DEV_DB_USER as string,
    host: process.env.DEV_DB_HOST as string,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_USER as string,
    host: process.env.TEST_DB_HOST as string,
    dialect: 'postgres',
  },
  production: {
    username: (process.env.PROD_DB_USERNAME as string) || '',
    password: (process.env.PROD_DB_PASSWORD as string) || '',
    database: (process.env.PROD_DB_USER as string) || '',
    host: (process.env.PROD_DB_HOST as string) || '',
    dialect: 'postgres',
  },
};

// app middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'dist')));

// start the app

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
