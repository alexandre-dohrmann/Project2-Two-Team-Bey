const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js");
const ExerciseData = require("../models/exerciseData.js");

//landing page
router.get("/", async (req, res) => {
  try {
    const foundExercise = await Exercise.find({});//use_id when referring to the workout stored in session
      res.render("exercise/index.ejs", {
        exercise: foundExercise
        });
  } catch (err){
    res.send(err);
  }
})

//route to workout details page
router.get("/:id/add-to-workout", async (req, res)=>{
  try  {
    // const foundWorkout = await Workout.findById(req.params.id);
    const exerciseFromDB = await Exercise.findById(req.params.id);
    // const foundUser = await User.find({});
    req.session.workout = foundWorkout
    console.log (exerciseFromDB);
      res.render("workout/show.ejs", {
            workout: foundWorkout,
            exercise: exerciseFromDB,
            // user: foundUser,
            // username: req.session.username,
          });
  } catch (err) {
      res.send(err);
  }
});

router.post("/:id/add-to-workout", async (req, res) => {
  try {
    const exerciseFromDB = await Exercise.findById(req.params.id);
    const currentWorkout = await Workout.findById(req.session.currentWorkout._id);
    const [foundExercise, foundWorkout] = await Promise.all([exerciseFromDB, currentWorkout]);
    console.log(foundExercise + "this should be the exercise I just clicked on"); 
    console.log(foundWorkout + "this should be the workout that just came from the workout[i]_.id/show.ejs");
    foundWorkout.exercises.push(foundExercise);
    console.log(foundWorkout.exercises + "this should be showing me an array of exercises with the exercise I just added");

    await foundWorkout.save();
    res.redirect("/exercise");

  } catch (err){
    console.log(err)
    res.send(err);
  }
})

//show route --detailed page
router.get("/:id", async (req, res) => {
  try{
    const foundExercise = await Exercise.findById(req.params.id);
    res.render("exercise/show.ejs", {
      exercise: foundExercise,
      exerciseList: Exercise
    });
  } catch(err){
    res.send(err);
  }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Create Route
// router.post("/", async (req, res, next) => {
//   try {
//   const createdExercise = await Exercise.create({
//                                                   name: req.body.name
//                                                 });
//   console.log(createdExercise, " this is the createdExercise");

//   res.redirect("/exercise");

//   } catch (err){
//     console.log(err);
//     res.send(err);
//     next(err);
// }
// });

//new route
// 
 
// });

//Edit Route
// router.get("/:id/edit", async (req, res) => {
//   try{
//     const foundExercise = await Exercise.findById(req.params.id);
//     console.log(foundExercise);
//     res.render("exercise/edit.ejs", {
//      exercise: foundExercise
//    });
//    } catch (err){
//       res.send(err);
//    }
// });


//Update Route ****ERICA IS WORKING HERE RIGHT NOW 7/26 4:30PM
// router.put("/:id", async (req, res, next) => {
//   try{
//     const currentWorkout = await Workout.findByIdAndUpdate(req.session.currentWorkout_id, req.body, {new: true});
//     console.log(updatedExercise, " this is the updatedExercise");
//     res.redirect("/exercise");

//   } catch(err) {
//     res.send(err);
//     next(err);
//   }
// });


// // Delete Route
// router.delete("/:id", async (req, res) => {

//   try{
//     const deletedExercise = await Exercise.findByIdAndRemove(req.params.id);
//     console.log(deletedExercise, " this is the deletedExercise");
//       res.redirect("/exercise")

//   } catch (err) {
//     console.log (err)
//     res.send(err);
//   }
// });

module.exports = router;