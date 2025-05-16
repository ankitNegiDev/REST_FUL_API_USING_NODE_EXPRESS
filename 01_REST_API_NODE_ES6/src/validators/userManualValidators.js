export function createUserManualValidator(req,res,next){
    if(!req.body.firstName ){
        return res.status(400).json({
            error : "firstName is required"
        })
    }
    if (!req.body.lastName) {
        return res.status(400).json({
            error: "lastName is required"
        })
    }
    if (!req.body.hobby) {
        return res.status(400).json({
            error: "hobby is required"
        })
    }

    // length validation..

    // if request body have all the parameters that a user required then we will call next middleware which is controller (createUser())
    next();
}

/*
no need since we already handeling it on db level that when user send invalid id . or id that does not matches... 
else without id this route will never hit .. like /users/id -> without id it would be /users
export function getUserByIdManualValidator(req,res,next){
    if(!req.params.id){
        return res.status(400).json({
            error:"User id is required"
        })
    }
    next();
}
*/
