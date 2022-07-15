/*  USER MODEL
    - username (string, unique, required, trimmed)
    - email (string, unique, required, valid)
    - thoughts (array of _id values referencing thought)
    - friends (array of _id values referencing friends)
    SCHEMA
    - friendCount virtual (retrieves the len of user's friends array)
*/

const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please enter a valid email address.']
    },
    thoughts: [{
        type: Schema.Types.ObjectID,
        ref: 'thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectID,
        ref: 'users'
    }]
}, {
    toJSON: {
        virtuals: true,
    }
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;