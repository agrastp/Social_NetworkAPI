const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('users', userSchema);

module.exports = User;







