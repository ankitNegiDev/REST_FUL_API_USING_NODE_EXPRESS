// here we will implement a simple logic that -> if any bad word is present in username then don't create the user.


/*
// importing filter object badword package
import {Filter} from 'bad-words';

// importing the createUser function of userRepository .
import { createUser as createUserRepository } from '../repository/userRepository.js';


// importing containsProfanity and cleanProfanity function from utils
import { containsProfanityStrict , cleanProfanityStrict , escapeRegex } from '../utils/profanityCheck.js';

// creating a custom function to chevck for strictProfanity..
/*
    currently if we write badWrod it detect it and throw error which is fine.

    But if i write ankitbadword then it considred it as correct userName but ideally it should not .. so to avoid this we need to do strict check like if sub string is not containing any bad word.. 
*

export async function createUser({ firstName, lastName, hobby }) {
    const filter = new Filter();
    const badFields=[];

    if (containsProfanityStrict(firstName)) {
        badFields.push(`firstName : ${cleanProfanityStrict(firstName)}`);
    }
    if (containsProfanityStrict(lastName)) {
        badFields.push(`lastName : ${cleanProfanityStrict(lastName)}`);
    }
    if (containsProfanityStrict(hobby)) {
        badFields.push(`hobby : ${cleanProfanityStrict(hobby)}`);
    }

    // Checking if any of the fields contain profanity(bad words)
    /*
    if (
        filter.isProfane(firstName) ||
        filter.isProfane(lastName) ||
        filter.isProfane(hobby)
    )
    *
    console.log("result of contains  : ",containsProfanityStrict(firstName),"\n\n");
    if(
        containsProfanityStrict(firstName) ||
        containsProfanityStrict(lastName)  ||
        containsProfanityStrict(hobby)
    ){
        /*
        the problem is it does not clean the string... but i want if someone write ... ankitbadword ---> clean version --> ankit****** like this.
        // Loging the cleaned versions (for debugging or logs)
        console.log("firstName:", firstName, "| Clean:", filter.clean(firstName));
        console.log("lastName:", lastName, "| Clean:", filter.clean(lastName));
        console.log("hobby:", hobby, "| Clean:", filter.clean(hobby));
        *
        console.log("firstName:", firstName, "| Clean:", cleanProfanityStrict(firstName));
        console.log("lastName:", lastName, "| Clean:", cleanProfanityStrict(lastName));
        console.log("hobby:", hobby, "| Clean:", cleanProfanityStrict(hobby));


        // Throwing error back to controller layer via service layer
        // throw new Error("Sorry, user contains blocked words.");
        // throw new Error(`Sorry, blocked words detected in : ${badFields.join(', ')}`);
        const error = new Error("Unable to create user — inappropriate words found in the input.");

        error.details=badFields;
        error.status=400;
        throw error;
    }
    /*
    this is the case when internal server error will occur from controller.. when user write the correct but there is some issue in our server..
    if(true){
        throw{
            
        }
    }
    *

    // All fields are clean boom -→ proceed to create user...
    const user = await createUserRepository({ firstName, lastName, hobby });
    return user;
}
*/


// clean version ...........

// Service Layer: Responsible for business logic related to creating a user

// Importing bad-words filter library
import { Filter } from 'bad-words';

// Importing repository function into service layer..
import { 
        createUser  as createUserRepository, 
        getAllUsers as getAllUsersRepository , 
        getUserById as getUserByIdRepository ,
        deleteUser as deleteUserRepository,
        updateUser as updateUserRepository,

    } from '../repository/userRepository.js';

// Importing utility functions to handle profanity from utils/profanityCheck.js
import { containsProfanityStrict, cleanProfanityStrict } from '../utils/profanityCheck.js';

// Main Service Function: Handles profanity check and user creation
export async function createUser({ firstName, lastName, hobby }) {
    const filter = new Filter();        // For reference, not directly used in this strict check
    const badFields = [];              // To track fields that contains profanity or bad words.

    // ----------- STEP 1: Detect and Collect Profane Fields -------------
    if (containsProfanityStrict(firstName)) {
        badFields.push(`firstName : ${cleanProfanityStrict(firstName)}`);
    }

    if (containsProfanityStrict(lastName)) {
        badFields.push(`lastName : ${cleanProfanityStrict(lastName)}`);
    }

    if (containsProfanityStrict(hobby)) {
        badFields.push(`hobby : ${cleanProfanityStrict(hobby)}`);
    }

    // ----------- STEP 2: If Any Profane Field Exists, Block Creation -------------
    if (badFields.length > 0) {
        // Logging cleaned values for debugging....
        console.log("firstName:", firstName, "| Cleaned:", cleanProfanityStrict(firstName));
        console.log("lastName:", lastName, "| Cleaned:", cleanProfanityStrict(lastName));
        console.log("hobby:", hobby, "| Cleaned:", cleanProfanityStrict(hobby));

        // Throwing custom error with details and status
        const error = new Error("Unable to create user — inappropriate words found in the input.");
        error.details = badFields;
        error.status = 400;
        throw error;
    }

    // ----------- STEP 3: If all Good then Proceed to Create User -------------
    const user = await createUserRepository({ firstName, lastName, hobby });
    return user;
}


// to get all the users

export async function getAllUsers(){
    const users= await getAllUsersRepository();
    return users;
}


// to get user by id.

export async function getUserById(id){
    const user = await getUserByIdRepository(id);

    // assume if user is null means did not found any user with given id.. in that case we will throw a error.
    if(!user){
        throw{
            message:`Sorry User is not found with given id : ${id}`,
            status: 404,
            sucess: false
        }
    }
    return user;
}

// to deelet user by id..
export async function deleteUser(id){
    const response=await deleteUserRepository(id);
    // assume if user is null means did not found any user with given id.. in that case we will throw a error.
    if (!response) {
        throw {
            message: `Sorry User is not found with given id : ${id}`,
            status: 404,
            sucess: false
        }
    }
    return response;
}

// to update userBy id 

export async function updateUser(id, incomingFirstName, incomingLastName, incomingHobby){

    const badFields = [];              // To track fields that contains profanity or bad words.

    // ----------- STEP 1: Detect and Collect Profane Fields -------------
    if (containsProfanityStrict(incomingFirstName)) {
        badFields.push(`firstName : ${cleanProfanityStrict(incomingFirstName)}`);
    }

    if (containsProfanityStrict(incomingLastName)) {
        badFields.push(`lastName : ${cleanProfanityStrict(incomingLastName)}`);
    }

    if (containsProfanityStrict(incomingHobby)) {
        badFields.push(`hobby : ${cleanProfanityStrict(incomingHobby)}`);
    }

    // ----------- STEP 2: If Any Profane Field Exists, Block Creation -------------
    if (badFields.length > 0) {
        // Logging cleaned values for debugging....
        console.log("firstName:", incomingFirstName, "| Cleaned:", cleanProfanityStrict(incomingFirstName));
        console.log("lastName:", incomingLastName, "| Cleaned:", cleanProfanityStrict(incomingLastName));
        console.log("hobby:", incomingHobby, "| Cleaned:", cleanProfanityStrict(incomingHobby));

        // Throwing custom error with details and status
        const error = new Error("Unable to create user — inappropriate words found in the input.");
        error.details = badFields;
        error.status = 400;
        throw error;
    }
    const response = await updateUserRepository(id,incomingFirstName,incomingLastName,incomingHobby);
    // if(!response){
    //     throw {
    //         status: 404,
    //         message: `User with id ${id} not found.`,
    //     };
    // }
}
