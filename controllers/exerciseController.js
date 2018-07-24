const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js")

//landing page
router.get("/", (req, res) => {
  Exercise.find({}, (err, foundExercise) => {
      res.render("exercise/index.ejs", {
        exercise: foundExercise
      });
//this is the array of exercises that lives on the index page
//on click i need to take an exercise--without changing the array-- and add it to a new array that lives inside a workout(arrayOfExercisesInWorkout)
//this is a start....
    //   const variableForExerciseData = {arrayOfExerciseObjects: [
    //                                                                                               {name: "squat"},
    //                                                                                               {name: "lunge"},
    //                                                                                               {name: "push up"},
    //                                                                                               {name: "pull up"},
    //                                                                                               {name: "jefferson curl"},
    //                                                                                               {name: "german arm swing"},
    //                                                                                               {name: "plank"}
    //                                                                                             ]
    // }
    // for (i = 0; i < variableForExerciseData.arrayOfExerciseObjects.length; i++){
    //   const oneExercise = variableForExerciseData.arrayOfExerciseObjects[i];
    //   $("<li> name" + oneExercise.name + "</li>".appendTo("ul")
    // }
  });
});

//new route
router.get("/new", (req, res) => {
  res.render("exercise/new.ejs");
});

//show route --detailed page
router.get("/:id", (req, res) => {
  Exercise.findById(req.params.id, (err, foundExercise) => {
    res.render("exercise/show.ejs", {
     exercise: foundExercise
    });
  });
});

//Edit Route
router.get("/:id/edit", (req, res) => {
  Exercise.findById(req.params.id, (err, foundExercise) => {
    res.render("exercise/edit.ejs", {
     exercise: foundExercise
    });
  });
});

//Update Route
router.put("/:id", (req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedExercise)=> {
    console.log(updatedExercise, " this is the updatedExercise");
    res.redirect("/exercise");
  });
});

//Create Route
router.post("/", (req, res) => {
  console.log(req.body)
  Exercise.create(req.body, (err, createdExercise) => {
    console.log(createdExercise, " this is the createdExercise");
    res.redirect("/exercise");
  });

});

// Delete Route
router.delete("/:id", (req, res) => {
  Exercise.findByIdAndRemove(req.params.id, (err, deletedExercise) => {
    console.log(deletedExercise, " this is the deletedExercise");
      res.redirect("/exercise")
    });
  });

module.exports = router;