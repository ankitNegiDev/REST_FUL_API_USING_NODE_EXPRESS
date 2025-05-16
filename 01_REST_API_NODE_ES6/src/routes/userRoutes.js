import express from 'express';
import { createUser, getAllUsers, getUserById,deleteUser, updateUser } from '../controllers/userController.js';
// import { createUserManualValidator,getUserByIdManualValidator } from '../validators/userManualValidators.js';
import { validate } from '../validators/zodValidator.js';
import { userZodSchema } from '../validators/userZodSchema.js';
import { validateUserFields } from '../middleware/middleware.js';



// it will return us a new router object which we are storing into userRouter
const userRouter=express.Router(); 

// now using this router object ie userRouter we can define get/post/put/patch/delete request.

/*
if the remaining url after /users is empty then this route will hit. means url will be like ----> http://localhost:3000/users

userRouter.get('/',function callback(req,res){
    console.log("/user roter");
    res.send("<h1> hello this /users route <h1>");
})
*/

// importing the controller function.. by doing this we ensure that routing layer only contain the routing logic not the controller layer logic..

userRouter.get('/',getAllUsers);

/*
if the remaning url after /users start with id then hit this route means url will be like ---> http://localhost:3000/users/3

userRouter.get('/:id',function callback(req,res){
    console.log("/users/id route");
    // res.send("<h1>hello this is /users/id route </h1>");
    return res.json({
        id:req.params.id,
        user:"bingo",
    })
})
*/

// importing the controller function.. by doing this we ensure that routing layer only contain the routing logic not the controller layer logic..
// userRouter.get('/:id',getUserByIdManualValidator,getUserById);
userRouter.get('/:id',getUserById);


// this is when we use manualValidator.
// userRouter.post('/',createUserManualValidator,createUser);

// this is when we are using zod validation.
userRouter.post('/',validate(userZodSchema),createUser);


userRouter.delete('/:id',deleteUser);


userRouter.put('/:id',updateUser);




export default userRouter;