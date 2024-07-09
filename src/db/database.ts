// db/database.ts

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { DBEnviroment } from '..';

dotenv.config();

const dbConfig = DBEnviroment['production'];
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Initialize Sequelize instance
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/models'], // Specify the directory where Sequelize should find models
  ...Object?.fromEntries(
    Object?.entries(dbConfig)?.filter(
      ([key]) => !['database', 'username', 'password', 'host'].includes(key)
    )
  ),
});

// Function to connect to the database
const connectToDB = async () => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log(`Database Connected Successfully!! Host: ${dbConfig.host}`);
  } catch (error) {
    console.error('Error Connecting to DB:', error);
  }
};

// Call the connectToDB function to initiate the connection
connectToDB();

// Export the sequelize instance to be used elsewhere in your application
export default sequelize;
