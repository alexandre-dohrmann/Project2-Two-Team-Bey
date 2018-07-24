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
    res.render("user/index.ejs", {
      workout: allWorkouts,
      users: foundUser
    });
  });
});
});

//Create Route
router.post("/",(req, res) => {
  Workout.create(req.body, (err, createdWorkout) => {
    if (err){
    console.log(err)//see terminal
    res.send(err);//see browser
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
  Workout.create({
                  name: req.body.name, 
                  category: req.body.category,
                  trainingPhase: req.body.trainingPhase, 
                  sets: req.body.sets,
                  reps: req.body.reps, 
                  exercises: [Exercise.schema]
                }, (err, createdWorkout) => {
  
 Workout.findById(req.params.id, (err, foundWorkout) => {
  if (err){
  console.log(err)//see terminal
  res.send(err);//see browser
  }else{
    console.log(createdWorkout)

  }
    res.render("workout/edit.ejs", {
      workout: createdWorkout,
      workout: foundWorkout
    });
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
  Workout.create({
                  name: req.body.name, 
                  category: req.body.category,
                  trainingPhase: req.body.trainingPhase, 
                  sets: req.body.sets,
                  reps: req.body.reps, 
                  exercises: [Exercise.schema]
                }, (err, updatedWorkout) => {
 
  
    console.log(updatedWorkout, "this is the updatedWorkout");

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





