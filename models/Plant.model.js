const { Schema, model } = require("mongoose");

const plantSchema = new Schema (
{
nickname: {
 type: String,
 required: [true, "Nickname for your plant is required"],
 },
 
 sunlightPositioning: {
 type: String,
 required: [true, "Positioning for your plant is required"],
 },
 
 image: {
 type: String,
 },
 
 plantHeight: {
 type: Number
 },
 
 birthDate: {
 type: Date
 },
 
 currentCondition: {
 type: String
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
  ref: "Disease"
 }],
}
) 

const Plant = model("Plant", plantSchema);

module.exports = Plant;