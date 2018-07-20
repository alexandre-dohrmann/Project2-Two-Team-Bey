const mongoose = require('mongoose');



const exerciseSchema = new mongoose.Schema({
  name: String,
});


module.exports = mongoose.model('Exercise', exerciseSchema);