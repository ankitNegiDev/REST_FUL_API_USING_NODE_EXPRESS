// creating the zod schema..

import {z} from 'zod';

export const userZodSchema = z.object({
    // check id should be a number.. ??
    // id: z.string().trim(),
    firstName: z.string().min(1).max(100).trim(),
    lastName: z.string().min(1).max(50).trim(),
    hobby: z.string().min(1).max(100).trim()
})