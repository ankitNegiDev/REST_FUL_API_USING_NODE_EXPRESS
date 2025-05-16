import express from 'express';
import { PORT } from './config/serverConfig.js';
import userRouter from './routes/userRoutes.js';
import { requestLogger, validateUpdateFields, validateUserFields } from './middleware/middleware.js';

const app=express(); 

// using inbuilt middleware
app.use(express.json());
app.use(express.text());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));




// custom middlewares
// Using logging middleware for all routes
app.use(requestLogger);

// Using  validation only on routes that might modify data (POST & PUT)
app.use(validateUserFields);

// using validation only on put routes 
app.use(validateUpdateFields);

app.listen(PORT,function (){
    console.log(`server is listining on port ${PORT}`);
})

// using app.use we can register middleware , and we can register routers.
// if the request url start with /users then use the userRouter
// http://localhost:3000/users ----> then serve this request with userRouter.
app.use('/users',userRouter);

// this is just for testing to check server is working or not.
app.get('/ping',function callback(req,res){
    res.send("<h1> hii i am /route </h1>");
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found please use valid api url that start with /users`,
        expectedUrl:`http://localhost/users`
    });
});

// this middleware is for restricting the user to select the correct path of api that start with /users.

app.all("/users", (req, res) => {
    let message;

    switch (req.method) {
        case "POST":
            message = "POST /users is not allowed directly. Use POST /users and add some data";
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

    return res.status(405).json({
        success: false,
        message: message,
    });
});