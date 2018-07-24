const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");




//Landing page route
router.get("/", (req, res) => {
	Workout.find({}, (err, allWorkouts) => {
    User.find({}, (err, foundUser) => {
    if (err){
      console.log(err);//see terminal
      res.send(err);//see browser
    }else{

    }
    res.render("workout/index.ejs", {//changed this
      workout: allWorkouts,
      users: foundUser
    });
  });
});
});

//Create Route
router.post("/",(req, res) => {
  Workout.create({
                  name: req.body.name, 
                  category: req.body.category,
                  trainingPhase: req.body.trainingPhase, 
                  sets: req.body.sets,
                  reps: req.body.reps, 
                  exercises: [Exercise.schema]
                }, (err, createdWorkout) => {
                  if (err){
                    console.log(err)
                    res.send(err)
                }else{
                  console.log(createdWorkout)
                  res.redirect("/workout");
                }
});
});  


//NEW route
router.get("/new", (req, res) => {
  Workout.find({}, (err, allWorkouts) => {
    
    if (err){
      console.log(err);//see terminal
      res.send(err);//see browser
    }else{

    }
    res.render("workout/new.ejs", {
      workout: allWorkouts
    });
  });
  });

//Edit Route
router.get("/:id/edit", (req, res) => {
  
 Workout.findById(req.params.id, (err, foundWorkout) => {
  if (err){
  console.log(err)//see terminal
  res.send(err);//see browser
  }else{
    console.log(foundWorkout)

  }
    res.render("workout/edit.ejs", {
      workout: foundWorkout
    });
  });
});


//Show Route--detailed page
router.get("/:id", (req, res) => {
  Workout.findById(req.params.id, (err, foundWorkout) => {
    res.render("workout/show.ejs", {
      workout: foundWorkout
    });
  });
});



//Update Route
router.put("/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, 
                            {name: req.body.name, 
                            category: req.body.category,
                            trainingPhase: req.body.trainingPhase, 
                            sets: req.body.sets,
                            reps: req.body.reps, 
                            exercises: [Exercise.schema]},
  {new: true}, (err, updatedWorkout) => {
      if(err){
        res.send(err);
      }else{
      console.log(updatedWorkout, "this is the updatedWorkout");
      res.redirect("/workout");
      }
  });
});


// Find & Delete workout
//send workout's deleted exercise to the deleted workout's exercise property
//remove exercise object from deleted workout collection
router.delete("/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
    console.log(deletedWorkout, " this is deletedWorkout");
    
      res.redirect("/workout")
    });
  });

module.exports = router;





