// Handling all user-related routes using express.Router

import express from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from '../controllers/userController.js';

import { validate } from '../validators/zodValidator.js'; // Custom middleware to validate request body using Zod
import { userZodSchema } from '../validators/userZodSchema.js'; // Zod schema for user data validation

// Creating an instance of express Router
const userRouter = express.Router();

// =================== ROUTES =====================

// GET /users/ → Get all users
userRouter.get('/', getAllUsers);

// GET /users/:id → Get a single user by ID
userRouter.get('/:id', getUserById);

// POST /users/ → Create a new user
// Applies Zod validation before calling controller
userRouter.post('/', validate(userZodSchema), createUser);

// DELETE /users/:id → Delete user by ID
userRouter.delete('/:id', deleteUser);

// PUT /users/:id → Update user by ID
userRouter.put('/:id', updateUser);

// Exporting the router to be used in main app
export default userRouter;
