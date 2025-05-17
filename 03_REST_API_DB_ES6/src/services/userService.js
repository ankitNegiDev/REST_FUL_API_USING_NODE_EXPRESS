// Business logic layer: Responsible for sanitizing inputs and handling user-related operations

// Importing repository functions to interact with the MongoDB database
import {
    createUser as createUserRepository,
    getAllUsers as getAllUsersRepository,
    getUserById as getUserByIdRepository,
    deleteUser as deleteUserRepository,
    updateUser as updateUserRepository
} from '../repository/userRepository.js';

// Importing profanity-check utilities to detect and clean inappropriate words in inputs
import { containsProfanityStrict, cleanProfanityStrict } from '../utils/profanityCheck.js';

/* -------- CREATE USER -------- */
/**
 * Creates a new user after checking for profanity in input fields.
 * Throws error if inappropriate words are found.
 * @param {Object} param - Object containing firstName, lastName, and hobby
 * @returns {Object} Created user document
 */
export async function createUser({ firstName, lastName, hobby }) {
    const badFields = [];

    // Checking each field for profanity and collecting the cleaned versions of bad words
    if (containsProfanityStrict(firstName)) {
        badFields.push(`firstName : ${cleanProfanityStrict(firstName)}`);
    }
    if (containsProfanityStrict(lastName)) {
        badFields.push(`lastName : ${cleanProfanityStrict(lastName)}`);
    }
    if (containsProfanityStrict(hobby)) {
        badFields.push(`hobby : ${cleanProfanityStrict(hobby)}`);
    }

    // Throwing an error if any profane words are found
    if (badFields.length > 0) {
        const error = new Error("Unable to create user — inappropriate words found in the input.");
        error.details = badFields;
        error.status = 400; // Bad Request
        throw error;
    }

    // Calling repository function to create user in the database
    const user = await createUserRepository({ firstName, lastName, hobby });
    return user;
}

/* -------- GET ALL USERS -------- */
/**
 * Retrieves all users from the database.
 * @returns {Array} Array of user documents
 */

export async function getAllUsers() {
    // return await getAllUsersRepository();
    // 'await' has no effect here because getAllUsersRepository() already returns a Promise,
    // and since this function is async, returning the Promise directly will automatically wait for it to resolve.
    return getAllUsersRepository();

}
/* -------- GET USER BY ID -------- */
/**
 * Retrieves a user by their ID.
 * Throws 404 error if user is not found.
 * @param {string} id - User's unique ID
 * @returns {Object} User document
 */
export async function getUserById(id) {
    const user = await getUserByIdRepository(id);
    console.log("user in service is : ",user);
    if (!user) {
        const error = new Error(`User not found with ID: ${id}`);
        error.status = 404; // Not Found
        throw error;
    }
    return user;
}

/* -------- DELETE USER BY ID -------- */
/**
 * Deletes a user by their ID.
 * Throws 404 error if user is not found.
 * @param {string} id - User's unique ID
 * @returns {Object} Deleted user document or confirmation
 */
export async function deleteUser(id) {
    const deletedUser = await deleteUserRepository(id);
    if (!deletedUser) {
        const error = new Error(`User not found with ID: ${id}`);
        error.status = 404; // Not Found
        throw error;
    }
    return deletedUser;
}

/* -------- UPDATE USER BY ID -------- */
/**
 * Updates a user's details after checking for profanity.
 * Throws error if inappropriate words are found.
 * Throws 404 error if user not found.
 * @param {string} id - User's unique ID
 * @param {string} firstName - Updated first name
 * @param {string} lastName - Updated last name
 * @param {string} hobby - Updated hobby
 * @returns {Object} Updated user document
 */
export async function updateUser(id, firstName, lastName, hobby) {
    const badFields = [];

    // Checking each updated field for profanity
    if (containsProfanityStrict(firstName)) {
        badFields.push(`firstName : ${cleanProfanityStrict(firstName)}`);
    }
    if (containsProfanityStrict(lastName)) {
        badFields.push(`lastName : ${cleanProfanityStrict(lastName)}`);
    }
    if (containsProfanityStrict(hobby)) {
        badFields.push(`hobby : ${cleanProfanityStrict(hobby)}`);
    }

    // Throwing error if any profane words found
    if (badFields.length > 0) {
        const error = new Error("Unable to update user — inappropriate words found in the input.");
        error.details = badFields;
        error.status = 400; // Bad Request
        throw error;
    }

    // Calling repository function to update user
    const updatedUser = await updateUserRepository(id, firstName, lastName, hobby);
    if (!updatedUser) {
        const error = new Error(`User not found with ID: ${id}`);
        error.status = 404; // Not Found
        throw error;
    }
    return updatedUser;
}
