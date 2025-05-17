// repository/userRepository.js

// Repository layer is responsible for interacting with the database.
// It performs all query-related operations (CRUD) using the schema.
// Sometimes this layer may directly call the schema/model methods (like create, find, etc.).

import User from "../schema/userSchema.js";

// @param — Describes function parameters
// @return (or @returns) — Describes what the function gives back
/**
 * Create a new user in the database.
 * @param {Object} param - Contains firstName, lastName, and hobby
 * @returns {Object} - Newly created user document
 */

export async function createUser({ firstName, lastName, hobby }) {
    try {
        const newUser = await User.create({ firstName, lastName, hobby });
        return newUser;
    } catch (error) {
        throw new Error(`Repository Error in createUser: ${error.message}`);
    }
}

/**
 * Fetch all users from the database.
 * @returns {Array} - Array of user documents
 */
export async function getAllUsers() {
    try {
        const users = await User.find();
        console.log("users in getAllUsers is: ", users);
        return users;
    } catch (error) {
        throw new Error(`Repository Error in getAllUsers: ${error.message}`);
    }
}

/**
 * Fetch a single user by ID.
 * @param {String} userId - MongoDB ObjectId of the user
 * @returns {Object|null} - User document if found, otherwise null
 */
export async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        // throw new Error(`Repository Error in getUserById: ${error.message} : error status : ${error.status}`);
        error=new Error(`please enter the valid id current id => ${userId} is not valid`);
        error.status=400;
        throw error;
    }
}

/**
 * Update an existing user's fields if provided.
 * Only updates the fields that are not undefined.
 * 
 * @param {String} userId - MongoDB ObjectId of the user
 * @param {String} incomingFirstName - New first name (optional)
 * @param {String} incomingLastName - New last name (optional)
 * @param {String} incomingHobby - New hobby (optional)
 * @returns {Object|null} - Updated user document or null if not found
 */
export async function updateUser(userId, incomingFirstName, incomingLastName, incomingHobby) {
    try {
        const updateData = {}; // Prepare an object with only defined fields

        if (incomingFirstName) updateData.firstName = incomingFirstName;
        if (incomingLastName) updateData.lastName = incomingLastName;
        if (incomingHobby) updateData.hobby = incomingHobby;

        // { new: true } returns the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        // throw new Error(`Repository Error in updateUser: ${error.message}`);
        error = new Error(`please enter the valid id current id => ${userId} is not valid`);
        error.status = 400;
        throw error;
    }
}

/**
 * Delete a user from the database by ID.
 * @param {String} userId - MongoDB ObjectId of the user
 * @returns {Object|null} - Success message if deleted, or null if user not found
 */
export async function deleteUser(userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser
            ? { success: true, message: 'User deleted successfully' }
            : null;
    } catch (error) {
        // throw new Error(`Repository Error in deleteUser: ${error.message}`);
        error = new Error(`please enter the valid id current id => ${userId} is not valid`);
        error.status = 400;
        throw error;
    }
}
