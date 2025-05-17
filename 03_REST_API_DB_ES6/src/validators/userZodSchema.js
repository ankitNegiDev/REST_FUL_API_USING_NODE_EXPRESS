// Creating a validation schema for user input using Zod library

import { z } from 'zod';

export const userZodSchema = z.object({
    // firstName must be a non-empty string, trimmed, with length between 1 and 100 characters
    firstName: z.string().min(1).max(100).trim(),

    // lastName must be a non-empty string, trimmed, with length between 1 and 50 characters
    lastName: z.string().min(1).max(50).trim(),

    // hobby must be a non-empty string, trimmed, with length between 1 and 100 characters
    hobby: z.string().min(1).max(100).trim()

    // Note: id field is commented out here; if needed, can be validated similarly
});
