// middleware.js

import { logRequestDetails } from "../utils/logDetails.js";

// 1. Logging Middleware
export function requestLogger(req, res, next) {
    const start = Date.now();

    // Wait for response to finish to get status code
    /*res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`--- Request Log ---`);
        console.log(`Time          : ${new Date().toLocaleString()}`);
        console.log(`Method        : ${req.method}`);
        console.log(`URL           : ${req.originalUrl}`);
        console.log(`Status Code   : ${res.statusCode}`);
        console.log(`Duration      : ${duration}ms`);
        console.log(`--------------------`);
        
    });
    */
    res.on('finish',function callback(){
        const duration = Date.now() - start; // in milliseconds
        logRequestDetails(req, res, duration);
    })

    next();
}

// 2. Validation Middleware (for POST and PUT requests)
export function validateUserFields(req, res, next) {
    const { method, body } = req;
    if ((method === 'POST' || method === 'PUT') && (!body || Object.keys(body).length === 0)) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty. Please provide required fields.",
        });
    }

    if (method === 'POST' || method === 'PUT') {
        const { firstName, lastName, hobby } = body;

        const missingFields = [];
        if (!firstName) missingFields.push("firstName : missing");
        if (!lastName) missingFields.push("lastName : missing");
        if (!hobby) missingFields.push("hobby : missing");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                // message: `Missing required fields:\n${missingFields.join('\n')}`,
                message : "please enter the missing fields",
                details: missingFields
            });
        }
    }

    next();
}

export function validateUpdateFields(req, res, next) {
    const allowedFields = ['firstName', 'lastName', 'hobby'];
    const updates = Object.keys(req.body);
    const invalidFields = updates.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Invalid fields in update: ${invalidFields.join(", ")}`
        });
    }
    next();
}
