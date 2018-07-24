const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js");

//Landing page route



//SHOW Route --detailed page
router.get("/:id/show", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("user/show.ejs", {
      user: foundUser
    });
  });
});

//Edit Route
router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("user/edit.ejs", {
      user: foundUser
    });
  });
});

//Update Route
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser)=> {
    console.log(updatedUser, "this is the updatedUser");
    res.redirect("/user");
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++
// RETURN TO THIS LATER!!!!!!!!!!
// ++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++

// Find & Delete User
//send user's deleted workouts to the deleted user's workout property
//remove workout object from deleted user collection
// router.delete("/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
//     console.log(deletedUser, " this is deletedUser");
//     const workoutId = [];
//     for(let i = 0; i < deletedUser.workout.length; i++){
//       workoutId.push(deletedUser.workout[i].id);
//     }

//     Workout.remove({
//       _id: { $in: workoutId}
//     }, (err, data) => {
//       res.redirect("/user")
//     });
//   });
// });

module.exports = router;