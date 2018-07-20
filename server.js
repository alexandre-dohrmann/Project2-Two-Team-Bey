const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
require('./db/db');

app.use(session({
  secret: 'secrets ruin lives',
  resave: false, 
  saveUninitialized: false 
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  next()
//   // if not logged you can redirect wherever you want
});

const userController   = require('./controllers/auth');

app.use('/auth', userController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
