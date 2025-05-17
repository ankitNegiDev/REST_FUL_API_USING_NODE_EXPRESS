// configuring the server..
import dotenv from 'dotenv'; // Importing dotenv package to manage environment variables

// Loading environment variables from a .env file into process.env
dotenv.config(); // This allows us to use variables defined in .env file throughout the project

// Short-circuiting: Use the PORT from the .env file  or fallback to 4000 if not defined
export const PORT = process.env.PORT || 4000;

// Exporting the MongoDB connection string from the environment variables
export const MONGODB_URL = process.env.MONGODB_URL;
