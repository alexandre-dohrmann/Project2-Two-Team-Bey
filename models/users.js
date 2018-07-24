const mongoose = require("mongoose");
const Workout = require("./workout");
const Exercise = require("./exercise");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  phoneNumber: String,
  exercises: [Exercise.schema],
  workouts: [Workout.schema]
});

module.exports = mongoose.model("User", userSchema);
