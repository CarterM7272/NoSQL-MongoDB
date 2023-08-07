// Imports
const { Schema, model } = require('mongoose');
const moment = require('moment'); // Note: 'moment' isn't used in this provided snippet. Make sure it's needed or remove it.

// User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// Virtual for Friend Count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// User Model
const User = model('User', UserSchema);

// Export
module.exports = User;