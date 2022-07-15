/** Thought MODEL
 *   - thoughtText (string, required, between 1 and 280 chars)
 *   - createdAt (date, set default val to current timestamp, use getter
 *       method to format on query)
 *   - userName (String, required)
 *   - reactions (array of nested docs created with reactionSchema)
 *   SCHEMA
 *   - reactionCount virtual that retrives len of thought's reactions arr
     Reaction SCHEMA
 *   - ReactionID (ObjectID, default: new ObjectID)
 *   - reactionBody (String, required, 280 char max)
 *   - userName (String, required)
 *   - createdAt (Date, default: current time, use getter to format
 *       timestamp on query) 
 */

const {
    Schema,
    model,
    Types
} = require('mongoose');

const getDate = function () {
    const date = this.createdAt;
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const dateString = date.toLocaleDateString('en-us', options);
}

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectID,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    userName: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
});

reactionSchema.methods.getDate = getDate;

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    }
});

thoughtSchema.methods.getDate = getDate;

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;