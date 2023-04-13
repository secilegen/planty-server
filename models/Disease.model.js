const { Schema, model } = require("mongoose");

const diseaseSchema = new Schema (
{
    name: {
    type: String,
    },
    symptoms: {
    type: String
    },
    treatment: {
    type: String
    },
    recoveryTime: {
    type: String
    },
    isContagious:{
    type: Boolean
    },
    supplements: {
    type: String
    },

    image: {
    type: String
    },

    hosts: [{
    type: Schema.Types.ObjectId,
     ref: "Plant"
    }]
    }
)
const Disease = model("Disease", diseaseSchema);

module.exports = Disease;