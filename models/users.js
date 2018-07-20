const mongoose = require("mongoose");
const Workout = require("./workout");


const userSchema = new mongoose.Schema({
  username: String,
  password: String
  workouts: [Workout.schema]
});


module.exports = mongoose.model("User", userSchema);
