// This is a generic validation utility file for Zod schema validation.

// Step 1: Creating a generic 'validate' function that accepts a Zod schema.
// This function returns an Express middleware function that validates incoming requests.

export function validate(schema) {
    // Returning middleware function receives req, res, and next
    return async function (req, res, next) {
        try {
            // Logging the request body for debugging purposes
            console.log("request.body is : ", req.body);

            // Using Zod's parse method to validate the request body against the provided schema
            // If validation fails, parse will throw an error which is caught in catch block
            schema.parse(req.body);

            // If validation succeeds, proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If validation fails, send a 400 Bad Request response with error details
            return res.status(400).json({
                error: error.errors,
                success: false,
                message: "Sorry, validation error occurred"
            });
        }
    }
}

// Step 2: Use this 'validate' function in your route handlers by passing the appropriate schema.
// Example: router.post('/user', validate(userZodSchema), createUser);
