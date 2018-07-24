const mongoose = require("mongoose");
const Exercise = require("./exercise");
const User = require("./users");


const workoutSchema = new mongoose.Schema({
	name: String,	
  	category: String, //Upper, Lower, Push, Pull, Full Body, Mobility, Core
  	trainingPhase: String, //deload, stabilization endurance, strength endurance, hypertrophy, maximal strength, power
  	sets: Number,
  	reps: Number,	
  	exercises: [mongoose.Schema.Types.ObjectId],

});


module.exports = mongoose.model("Workout", workoutSchema);