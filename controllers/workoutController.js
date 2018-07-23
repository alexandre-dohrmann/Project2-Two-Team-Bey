const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");


//Landing page route
router.get("/", (req, res) => {
	Workout.find({}, (err, foundWorkout) => {
    res.render("workout/index.ejs", {
      workout: foundWorkout
    });
  });
});

//NEW route
router.get("/new", (req, res) => {
  res.render("workout/new.ejs");
});

//Show Route--detailed page
router.get("/:id", (req, res) => {
  Workout.findById(req.params.id, (err, foundWorkout) => {
    res.render("workout/show.ejs", {
      workout: foundWorkout
    });
  });
});

//Edit Route
router.get("/:id/edit", (req, res) => {
  Workout.findById(req.params.id, (err, foundWorkout) => {
    res.render("workout/edit.ejs", {
      workout: foundWorkout
    });
  });
});

//Update Route
router.put("/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedWorkout)=> {
    console.log(updatedWorkout, "this is the updatedWorkout");
    res.redirect("/workout");
  });
});

//Create Route
router.post("/", (req, res) => {
  console.log(req.body)
  Workout.create(req.body, (err, createdWorkout) => {
    console.log(createdWorkout, " this is the createdWorkout");
    res.redirect("/workout");
  });
});

// Find & Delete workout
//send workout's deleted exercise to the deleted workout's exercise property
//remove exercise object from deleted workout collection
router.delete("/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
    console.log(deletedWorkout, " this is deletedWorkout");
    const exerciseId = [];
    for(let i = 0; i < deletedUser.exercise.length; i++){
      exerciseId.push(deletedWorkout.exercise[i].id);
    }

    Exercise.remove({
      _id: { $in: exerciseId}
    }, (err, data) => {
      res.redirect("/workout")
    });
  });
});

module.exports = router;





