const mongoose = require('mongoose');
const Exercise = require("./exercise");


const workoutSchema = new mongoose.Schema({
  catagory: String, //Bro Split - Upper, Bro Split - Lower, Full Body, Mobility, Core
  trainingPhase: String, //deload, stabilization endurance, strength endurance, hypertrophy, maximal strength, power
  sets: Number,
  reps: Number,
  weight: Number,
  exercises: [Exercise.schema]

});


module.exports = mongoose.model('Workout', workoutSchema);