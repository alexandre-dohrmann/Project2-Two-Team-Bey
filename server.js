const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');

app.use(session({
  secret: 'secrets ruin lives',
  resave: false, 
  saveUninitialized: false 
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


// app.use((req, res, next) => {
//   next()
// });

const authController = require('./controllers/authController');
const exerciseController = require('./controllers/exerciseController');
const usersController = require('./controllers/usersController');
const workoutController = require('./controllers/workoutController');

app.use('/auth', authController);
app.use('/exercise', exerciseController);
app.use('/user', usersController);
app.use('/workout', workoutController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
