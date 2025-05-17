// db configuration..
// Importing mongoose for connecting with MongoDB
import mongoose from 'mongoose';

// Importing the MongoDB connection URL from the server configuration file
import { MONGODB_URL } from './serverConfig.js';

// This async function establishes a connection to the MongoDB database
export default async function connectDB() {
    try {
        // Attempting to connect to MongoDB using the connection string from the environment variable
        await mongoose.connect(MONGODB_URL);

        // If the connection is successful then log a confirmation message
        console.log("connected to MongoDB\n");
    } catch (error) {
        // If the connection fails then log an error message
        console.log("failed to connect MongoDB\n");

        // logging the specific error that occurred inorder to help in debugging
        console.log("error in connectDB : ", error);
    }
}
