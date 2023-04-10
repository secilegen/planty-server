
const { Schema, model } = require("mongoose");

const plantSchema = new Schema (
{

common_name: {
    type: String
},

watering: {
    type: String
},

imageAPI: {
    type: String
},

nickname: {
 type: String,
 required: [true, "Nickname for your plant is required"],
 },
 
 sunlightPositioning: {
 type: String,
 enum: ['Low', 'Moderate', 'High']
 },
 
 image: {
 type: String,
 },
 
 
 plantHeight: {
 type: Number,
 required: [true, "Height is required in order the calculate right amount of water"]
 },
 
 birthDate: {
 type: Date
 },
 
 currentCondition: {
 type: String,
 enum: ['Thriving','Needs some attention','Not good condition']
 },
 
 apiId : {
 type: Number,
 required: true
 },
 
 user: {
 type: Schema.Types.ObjectId,
  ref: "User"
 },
 
 disease: [{
 type: Schema.Types.ObjectId,
 unique: [true, "You can't add multiple diseases of the same type"],
  ref: "Disease"
 }],
}
) 

const Plant = model("Plant", plantSchema);

module.exports = Plant;