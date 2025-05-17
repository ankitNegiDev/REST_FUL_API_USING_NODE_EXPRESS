import express from 'express';
import { PORT } from './config/serverConfig.js';
import userRouter from './routes/userRoutes.js';
import connectDB from './config/dbConfig.js';
import { requestLogger, validateUpdateFields, validateUserFields } from './middleware/middleware.js';

const app = express();

// Using built-in middleware to parse incoming JSON request bodies
app.use(express.json());

// Using built-in middleware to parse incoming text request bodies
app.use(express.text());

// Using built-in middleware to parse URL-encoded bodies (typically from HTML forms)
// The extended: true option allows for rich objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));


// Custom middleware

// Logging middleware applied globally for all routes to log request details
app.use(requestLogger);

// Validation middleware to check user input fields on routes that modify data (POST requests)
app.use(validateUserFields);

// Validation middleware specifically for PUT routes to validate update fields
app.use(validateUpdateFields);

// Mounting the userRouter on the '/users' path
// All routes starting with '/users' will be handled by userRouter
app.use('/users', userRouter);


// Starting the server and connect to the database once the app is listening
app.listen(PORT, () => {
    console.log("app is listening on port ", PORT);
    connectDB();
});


// Simple test route for health check or ping
app.get('/ping', function callback(req, res) {
    res.send("<h1>on route /ping</h1>");
});


// Middleware for handling 404 errors (route not found)
// This will catch any request that doesn't match defined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found please use valid api url that start with /users`,
        expectedUrl: `http://localhost/users`
    });
});

// Middleware to restrict usage of base /users route with unsupported HTTP methods
// For example, POST, PUT, DELETE on /users (without id) are not allowed directly
app.all("/users", (req, res) => {
    let message;

    switch (req.method) {
        case "POST":
            message = "POST /users is not allowed directly. Use POST /users and add some data";
            // (Note: This message seems a bit confusing; consider revising for clarity)
            break;
        case "PUT":
            message = "PUT /users is not allowed. Use PUT /users/:id instead.";
            break;
        case "DELETE":
            message = "DELETE /users is not allowed. Use DELETE /users/:id to delete a specific user.";
            break;
        default:
            message = `${req.method} /users is not allowed.`;
    }

    // Return 405 Method Not Allowed with the appropriate message
    return res.status(405).json({
        success: false,
        message: message,
    });
});
