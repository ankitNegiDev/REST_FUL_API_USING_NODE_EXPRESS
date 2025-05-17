// Helper functions to standardize API responses and avoid repeating similar code (following DRY principle).

/**
 * Sends a normal JSON response with status, success flag, data, and message.
 * @param {object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {boolean} success - Indicates if the request was successful.
 * @param {any} data - Data payload to send in the response.
 * @param {string} message - Informational message.
 * @returns {object} - Express response with JSON body.
 */
export function sendNormalResponse(res, status, success, data, message) {
    return res.status(status).json({ success, data, message });
}

/**
 * Sends an error JSON response with status, success flag, and error message.
 * @param {object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {boolean} success - Usually false for errors.
 * @param {string} message - Error message to send.
 * @returns {object} - Express response with JSON error body.
 */
export function sendErrorResponse(res, status, success, message) {
    return res.status(status).json({ success, message });
}

/**
 * Sends a JSON response specifically for create operations,
 * including status, success flag, data, message, and optionally badFields for validation errors.
 * @param {object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {boolean} success - Indicates if creation was successful.
 * @param {any} data - Created resource data.
 * @param {string} message - Informational or success message.
 * @param {Array} badFields - Array of fields with validation or profanity errors.
 * @returns {object} - Express response with detailed JSON body.
 */
export function sendResponseCreate(res, status, success, data, message, badFields) {
    return res.status(status).json({ success, data, message, badFields });
}
