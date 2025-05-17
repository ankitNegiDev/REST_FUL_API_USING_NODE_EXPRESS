// Importing mongoose library for MongoDB object modeling
// (Mongoose is an ODM - Object Document Mapper that helps interact with MongoDB using JavaScript objects)

import mongoose from 'mongoose';

// Defining a schema for User documents in MongoDB
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,         // Data type is string
        required: true,       // This field is mandatory
        trim: true,           // Automatically removes leading/trailing whitespace
        maxlength: 100        // Maximum length allowed is 100 characters
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
    },
    hobby: {
        type: String,
        required: false,      // Hobby is optional || true ..depend.
        trim: true,
        maxlength: 50
    }
}, { timestamps: true });     // Automatically adds createdAt and updatedAt fields

// Overriding the toJSON method to customize how User documents are converted to JSON
userSchema.methods.toJSON = function () {
    // Converting  Mongoose document instance to a plain JavaScript object
    const obj = this.toObject();

    // Formating the createdAt timestamp to a human-readable string in Asia/Kolkata timezone
    if (obj.createdAt) {
        obj.createdAt = this.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    }

    // Formating the updatedAt timestamp similarly
    if (obj.updatedAt) {
        obj.updatedAt = this.updatedAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    }

    // Returning the modified object. this version will be used whenever JSON.stringify or res.json is called
    return obj;
};

// Creating a Mongoose model called 'User' using the schema
// This corresponds to a 'users' collection in MongoDB
// creating a model object using this userSchema.
// in mongodb language this model is also called collection.
const User = mongoose.model('User', userSchema);

export default User;  // Export the model to use it elsewhere in the app
