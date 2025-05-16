// this is the generic file that required for zod.

//? step 1 => creating a generic validate function. and this function will take schema which we will define.
export function validate(schema){
    // this validation function will return this below function as middleware.
    return async function (req,res,next){
        try{
            console.log("request.body is : ",req.body);

            // this schema object gives us a parse function using which we will parse our request body.
            schema.parse(req.body);
            // if our incoming request body is not validate then it will  throw exceptions.else we will call next() middleware which is (createUser).
            next();
        }catch(error){
            return res.status(400).json({
                error:error.errors,
                sucess:false,
                message:"sorry validation error occured"
            })
        }
    }
}

//? step 2 => once validate function is prepared then just call this validate function and pass the schema in it.. (we will do this in router layer).
