const { Schema, model } = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

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




const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;