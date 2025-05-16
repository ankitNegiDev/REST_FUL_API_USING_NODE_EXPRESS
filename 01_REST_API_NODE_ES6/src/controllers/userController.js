// now importing the function from the service layer..
import { 
        createUser as createUserService , 
        getAllUsers as getAllUsersService,
        getUserById as getUserByIdService ,
        deleteUser as deleteUserService,
        updateUser as updateUserService
    } from "../service/userService.js";

// crating user.
export async function createUser(req,res){
    try{
        const user= await createUserService({firstName:req.body.firstName,lastName:req.body.lastName,hobby:req.body.hobby});

        // if user is created sucessfully.
        return res.status(201).json({
            sucess:true,
            data: user,
            message:"conguratualations user created sucessfully"
        })

    }catch(error){
        console.log("error occured in controller : ",error.message);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message,
                badFields: error.details || []
            });
        }
        // in case if user write the correct input but some issue on server side.. then we don't wnat to tell user what's going on server why request is not processed .. we log simple message.
        return res.status(500).json({
            message:"Sorry Internal server error",
            sucess: false
        })
    }
}

// status 400 => The server cannot or will not process the request due to a client error


// get all users...
export async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersService();

        
        return res.status(200).json({
            sucess: true,
            data: users,
            message: "conguratualations all users fetched sucessfully"
        })

    } catch (error) {
        console.log("error occured in controller : ", error.message);
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// get user by id...

export async function getUserById(req,res){
    try {
        const users = await getUserByIdService(req.params.id);


        return res.status(200).json({
            sucess: true,
            data: users,
            message: "conguratualations user fetched sucessfully"
        })

    } catch (error) {
        console.log("error occured in controller : ", error.message);

        if(error.status){
            return res.status(error.status).json({
                message:error.message,
                success:false
            });
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }

}

// delete user 
export async function deleteUser(req,res){
    try{
        const response = await deleteUserService(req.params.id);


        return res.status(200).json({
            sucess: true,
            data: response,
            message: "conguratualations user deleted sucessfully"
        })
    }catch(error){
        console.log("error : ",error);
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: "Sorry Something went wrong",
            sucess: false
        });
    }
}

// update user..

export async function updateUser(req,res){
    try{
        const response = await updateUserService(req.params.id,req.body.firstName,req.body.lastName,req.body.hobby);
        return res.status(200).json({
            sucess: true,
            data: response,
            message: "conguratualations user info updated sucessfully"
        })
    }catch(error){
        console.log("error : ",error);
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
                badFields: error.details || []
            });
        }
        return res.status(500).json({
            message: "Sorry Something went wrong",
            sucess: false
        });
    }
}