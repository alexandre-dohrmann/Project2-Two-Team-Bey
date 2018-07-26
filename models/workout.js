const mongoose = require("mongoose");
const Exercise = require("./exercise");
const User = require("./users");


const workoutSchema = new mongoose.Schema({
	name: String,	
  	category: String,
  	sets: Number,
  	reps: Number,	
  	trainingPhase: String, 
  	exercises: [String]//I changed this 7/25 @ 6pm

});


module.exports = mongoose.model("Workout", workoutSchema);