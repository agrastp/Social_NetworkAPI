const { Schema, Types } = require("mongoose");

// Format timestamp function
function dateFormat(date) {
    return date.toLocaleString();
};

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal),
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;
