const mongoose = require("mongoose");
const Workout = require("./workout");
const Exercise = require("./exercise");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  displayName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  exercises: [Exercise.schema],
  workouts: [Workout.schema]
});

module.exports = mongoose.model("User", userSchema);
