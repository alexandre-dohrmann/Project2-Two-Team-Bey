const mongoose = require('mongoose');

// create our db and connect
mongoose.connect('mongodb://localhost/project2');

mongoose.connection.on('connected', () => {
  console.log('Beyonce is here yall!');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'Beyonce is not ready to perform');
});

mongoose.connection.on('disconnected', () => {
  console.log('Beyonce out!');
});
