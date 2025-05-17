// controllers.


// now importing the function from the service layer..
import { 
        createUser as createUserService , 
        getAllUsers as getAllUsersService,
        getUserById as getUserByIdService ,
        deleteUser as deleteUserService,
        updateUser as updateUserService
    } from "../services/userService.js";
import { sendErrorResponse, sendNormalResponse, sendResponseCreate } from "../utils/responseHelper.js";


// currently all the function are voiliting the DRY-principle... so to avoid it we will create a helper function..........

// crating user.
export async function createUser(req,res){
    try{
        const user= await createUserService({firstName:req.body.firstName,lastName:req.body.lastName,hobby:req.body.hobby});

        // if user is created sucessfully.
        /*
        return res.status(201).json({
            sucess:true,
            data: user,
            message:"conguratualations user created sucessfully"
        })
        */
        return sendNormalResponse(res, 201, true, user, "conguratualations user created sucessfully");

    }catch(error){
        console.log("error occured in controller : ",error.message);
        if(error.status){
            /*
            return res.status(error.status).json({
                success: false,
                message: error.message,
                badFields: error.details || []
            });
            */
            const badFields=error.details || [];
            return sendResponseCreate(res, error.status, false, error.message, badFields);
        }
        // in case if user write the correct input but some issue on server side.. then we don't wnat to tell user what's going on server why request is not processed .. we log simple message.
        /*
        return res.status(500).json({
            message:"Sorry Internal server error",
            sucess: false
        })
        */
        return sendErrorResponse(res,500,false,"Sorry Internal server error");

    }
}

// status 400 => The server cannot or will not process the request due to a client error


// get all users...
export async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersService();
        // there might be question why we are checking it here we can check it either in rpeosityro or service layer but just think sending repsonse is a work of controller that's why we are sending repsonse from controller. just to make sepration of concern.
        if(users.length<=0){
            /*
            return res.status(200).json({
                sucess:true,
                data:users,
                message:"sorry there is no data in the database please add data first"
            })
            */
            return sendNormalResponse(res, 200, true, users,"sorry there is no data in the database please add data first");
        }

        
        /*
        return res.status(200).json({
            sucess: true,
            data: users,
            message: "conguratualations all users fetched sucessfully"
        })
        */
        return sendNormalResponse(res, 200, true, users, "conguratualations all users fetched sucessfully");

    } catch (error) {
        console.log("error occured in controller : ", error.message);
        /*
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
        */
        return sendErrorResponse(res, 500, false, "Sorry Internal server error");
    }
}

// get user by id...

export async function getUserById(req,res){
    try {
        const users = await getUserByIdService(req.params.id);


        /*
        return res.status(200).json({
            sucess: true,
            data: users,
            message: "conguratualations user fetched sucessfully"
        })
        */
        return sendNormalResponse(res, 200, true, users, "conguratualations user fetched sucessfully");

    } catch (error) {
        console.log("error occured in controller : ", error.message);

        if(error.status){
            /*
            return res.status(error.status).json({
                message:error.message,
                success:false
            });
            */
            console.log("error object is : ",error);
            return sendErrorResponse(res,error.status,false,error.message);
        }
        /*
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
        */
        return sendErrorResponse(res, 500, false, "Sorry Internal server error");
    }

}

// delete user 
export async function deleteUser(req,res){
    try{
        const response = await deleteUserService(req.params.id);


        /*
        return res.status(200).json({
            sucess: true,
            data: response,
            message: "conguratualations user deleted sucessfully"
        })
        */
        return sendNormalResponse(res, 200, true, response, "conguratualations user deleted sucessfully");
    }catch(error){
        console.log("error : ",error);
        if (error.status) {
            /*
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
            */
            return sendErrorResponse(res,error.status,false,error.message);
        }
        /*
        return res.status(500).json({
            message: "Sorry Something went wrong",
            sucess: false
        });
        */
        return sendErrorResponse(res, 500, false, "Sorry Something went wrong");
    }
}

// update user..

export async function updateUser(req,res){
    try{
        const response = await updateUserService(req.params.id,req.body.firstName,req.body.lastName,req.body.hobby);
        /*
        return res.status(200).json({
            sucess: true,
            data: response,
            message: "conguratualations user info updated sucessfully"
        })
        */
        return sendNormalResponse(res, 200, true, response, "conguratualations user info updated sucessfully");
    }catch(error){
        console.log("error : ",error);
        if (error.status) {
            /*
            return res.status(error.status).json({
                success: false,
                message: error.message,
                badFields: error.details || []
            });
            */
            const badFields=error.details || [];
            return sendResponseCreate(res,error.status,false,error.message,badFields);
        }
        /*
        return res.status(500).json({
            message: "Sorry Something went wrong",
            sucess: false
        });
        */
        return sendErrorResponse(res, 500, false, "Sorry Something went wrong");
    }
}


// in simple our controoler layer is accepting the request after validation , and calling the service layer and sending the response that our controller layer got from the service.
// controller's job: Accept request -→ Call service -→ Return formatted response