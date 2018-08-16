const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');



app.use(session({
  secret: 'this is a secret',
  resave: false, //only save when the session object has been modified
  saveUninitialized: false //user for login sessions, we only want to save when we modify the session

}));


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use((req, res, next) => {
  next()
});

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

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
})