'use strict';



const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  name: {type:String, default:'image' },
  path: {type:String, required:true },
});



module.exports = mongoose.model('image', imageSchema);
