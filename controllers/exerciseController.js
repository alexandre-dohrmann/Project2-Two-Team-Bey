const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js")


router.get('/', (req, res) => {
  Author.find({}, (err, foundExercise) => {
      res.render('workout/index.ejs', {
        authors: foundAuthors
      });
  });

});

router.get('/new', (req, res) => {
  res.render('workout/new.ejs');
});


router.get('/:id', (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render('workout/show.ejs', {
      author: foundAuthor
    });
  });
});

router.get('/:id/edit', (req, res) => {

  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render('authors/edit.ejs', {
      author: foundAuthor
    });
  });

});

router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAuthor)=> {
    console.log(updatedAuthor, ' this is updatedAuthor');
    res.redirect('/authors');
  });
});


router.post('/', (req, res) => {
  console.log(req.body)
  Author.create(req.body, (err, createdAuthor) => {
    console.log(createdAuthor, ' this is the createdAuthor');
    res.redirect('/authors');
  });

});

// DELETE AN AUTHOR DELETE THE ASSOCIATED ARTICLES
router.delete('/:id', (req, res) => {

  Author.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
    console.log(deletedAuthor, ' this is deletedAuthor');
    // We are collecting all of the Article Ids from the deletedAuthors
    // articles property
    const articleIds = [];
    for(let i = 0; i < deletedAuthor.articles.length; i++){
      articleIds.push(deletedAuthor.articles[i].id);
    }

    Article.remove({
      _id: { $in: articleIds}
    }, (err, data) => {
      res.redirect('/authors')
    });
  });
});



module.exports = router;








module.exports = router;