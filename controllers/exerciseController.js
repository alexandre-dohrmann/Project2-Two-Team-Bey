const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js")

//landing page
router.get("/", async (req, res) => {
  try {
    const foundExercise = await Exercise.find({});
      res.render("exercise/index.ejs", {
        exercise: foundExercise
        });
  } catch (err){
    res.send(err);
  }
})

//Create Route
router.post("/", async (req, res, next) => {
  try {
  const createdExercise = await Exercise.create({
                                                  name: req.body.name
                                                });
  console.log(createdExercise, " this is the createdExercise");

  res.redirect("/exercise");

  } catch (err){
    console.log(err);
    res.send(err);
    next(err);
}
});

//new route
router.get("/new", (req, res) => {
  res.render("exercise/new.ejs");
 
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  try{
    const foundExercise = await Exercise.findById(req.params.id);
    console.log(foundExercise);
    res.render("exercise/edit.ejs", {
     exercise: foundExercise
   });
   } catch (err){
      res.send(err);
   }
});
 

//show route --detailed page
router.get("/:id", async (req, res) => {
  try{
    const foundExercise = await Exercise.findById(req.params.id);
    res.render("exercise/show.ejs", {
     exercise: foundExercise
    });
  } catch(err){
    res.send(err);
  }
});



//Update Route
router.put("/:id", async (req, res, next) => {
  try{
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(updatedExercise, " this is the updatedExercise");
    res.redirect("/exercise");

  } catch(err) {
    res.send(err);
    next(err);
  }
});


// Delete Route
router.delete("/:id", async (req, res) => {

  try{
    const deletedExercise = await Exercise.findByIdAndRemove(req.params.id);
    console.log(deletedExercise, " this is the deletedExercise");
      res.redirect("/exercise")

  } catch (err) {
    console.log (err)
    res.send(err);
  }
});

module.exports = router;