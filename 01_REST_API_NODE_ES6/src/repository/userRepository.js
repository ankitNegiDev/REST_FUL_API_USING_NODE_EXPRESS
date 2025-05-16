// here we will import the collection of user which is db assuming..

import usersArray from "../utils/userCollection.js";
import { v4 as uuidv4 } from 'uuid';

console.log("userARray value : ",usersArray);

export async function createUser ({firstName,lastName,hobby}){
    // We don't need async here actually, but keeping it for future async DB operation.. because db operation can be asynchronous..
    try{

        if (!Array.isArray(usersArray)) {
            throw new Error("usersArray is not a valid array");
        }

        // here we have to add the user into the array...
        const newUser={
            id:uuidv4(),
            firstName:firstName,
            lastName:lastName,
            hobby:hobby,
        }

        usersArray.push(newUser);
        console.log("data in userArray after pushing : \n\n",usersArray);
        return newUser; // imp since we need to send the response back as this newUser.


    }catch(error){
        // throw new Error ("sorry error occured in Repository layer createUser function\n");
        throw new Error(`Repository Error in createUser: ${error.message}`);
    }
}

// to get all the user..
export async function getAllUsers(){
    try{
        if (!Array.isArray(usersArray)) {
            throw new Error("usersArray is not a valid array");
        }
        return usersArray;
    }catch(error){
        // throw new Error("sorry error occured in Repository layer getUser function\n");
        throw new Error(`Repository Error in getUser: ${error.message}`);
    }
}

// to get one user using id.

export async function getUserById(userId){
    try{
        for(let i=0; i<usersArray.length; i++){
            if(usersArray[i].id === userId){
                return usersArray[i];
            }
        }
        console.log("no user found\n");
        return null;
    }catch(error){
        throw new Error("sorry error occured in Repository layer getUserById function\n");
    }
}

// to deelte the userData..

export async function deleteUser(userId){
    try{
        // step 1 => find the index of given userId...
        let index=-1;
        for(let i=0; i<usersArray.length; i++){
            if(usersArray[i].id===userId){
                index=i;
                break;
            }
        }
        /*
        ! causing problem of duplication..
        if (index === usersArray.length - 1) {
            usersArray.pop();
        }
        */
        if(index != -1){
            // shift the array data..
            for(let i=index; i<usersArray.length-1; i++){
                usersArray[i]=usersArray[i+1];
            }
            usersArray.pop();
            return { success: true, message: "User deleted successfully" };
        }else{
            console.log("no user found with given id.");
            return null;
        }
    }catch(error){
        throw new Error(`Repository Error in deleteUser: ${error.message}`);
    }
}


// update 
// if we want to update first we should know which user we want to update second is what thing we want to allowed so we allowed only firstName, lastName,hobby ... in most of cases we don't update the id or we don't give this power to user that he/she can update the id.
export async function updateUser(userId,incomingFirstName,incomingLastName,incomingHobby){
    try{
        // find the index whose userId this function recives.
        // step 1 => find the index of given userId...
        let index = -1;
        for (let i = 0; i < usersArray.length; i++) {
            if (usersArray[i].id === userId) {
                index = i;
                break;
            }
        }
        if(index !== -1){
            if(incomingFirstName){
                usersArray[index].firstName=incomingFirstName;
            }
            if(incomingLastName){
                usersArray[index].lastName=incomingLastName;
            }
            if(incomingHobby){
                usersArray[index].hobby=incomingHobby;
            }
            return {
                success: true,
                message: "User updated successfully",
                user: usersArray[index],  // returning updated user (optional)
            };
        }else{
            // User not found
            return null;
        }
    }catch(error){
        console.log("error : ",error);
        console.error("Error in updateUser:", error);
        throw new Error(`Repository Error in updateUser: ${error.message}`);
    }
}