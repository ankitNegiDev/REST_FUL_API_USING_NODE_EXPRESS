// middleware.js

import { logRequestDetails } from "../utils/logDetails.js";

/**
 * Middleware 1: Request Logger
 * this middleware logs the details about every incoming HTTP request including method, URL, status code, and duration.
 */
export function requestLogger(req, res, next) {
    const start = Date.now(); // Record start time

    // Waiting for response to finish inorder to calculate the duration
    res.on('finish', function callback() {
        const duration = Date.now() - start; // Total duration in milliseconds
        logRequestDetails(req, res, duration); // Logging the request details
    });

    next(); // Proceeding to next middleware once above task is finished.
}

/**
 * Middleware 2: Validation Middleware for POST and PUT Requests
 * this middleware validates the required fields (firstName, lastName, hobby) that are present in the request body or not
 * if in case any required field is missing then responds with status 400 and a detailed message inorder to improve debugging and user-experience.
 */

export function validateUserFields(req, res, next) {
    const { method, body } = req;

    // Checking if the body is empty or not if yes then send a response that tells request body is empty else move ahed.
    if ((method === 'POST' || method === 'PUT') && (!body || Object.keys(body).length === 0)) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty. Please provide required fields.",
        });
    }

    // Checking  for individual missing fields
    if (method === 'POST' || method === 'PUT') {
        const { firstName, lastName, hobby } = body;
        const missingFields = [];

        if (!firstName) missingFields.push("firstName : missing");
        if (!lastName) missingFields.push("lastName : missing");
        if (!hobby) missingFields.push("hobby : missing");

        // If any required field is missing then we are returning 400 with details
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter the missing fields",
                details: missingFields,
            });
        }
    }

    next(); // Proceeding to next middleware
}

/**
 * Middleware 3: Update Field Validator (PATCH/PUT)
 * this middleware ensures that only allowed fields (firstName, lastName, hobby) are included in the request body.
 * If any invalid field is found then responds with 400 and lists the invalid fields.
 */
import { sendErrorResponse } from "../utils/responseHelper.js";
export function validateUpdateFields(req, res, next) {
    const allowedFields = ['firstName', 'lastName', 'hobby'];

    if (!req.body || typeof req.body !== 'object') {
        return sendErrorResponse(res, 400, false, "Invalid or missing request body");
    }

    const updates = Object.keys(req.body);

    const invalidFields = updates.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return sendErrorResponse(
            res,
            400,
            false,
            `Invalid fields in update: ${invalidFields.join(", ")}`,
            invalidFields // Optional: pass in array if you're showing it in response
        );
    }

    next();
}

