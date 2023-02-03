const mongoose = require('mongoose');

const JournalistSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   body: {
       type: String,
       required: true
   },
   email: {
       type: String,
   },
   balance: {
       type: Number, 
       default: 0
   }

});

module.exports = mongoose.model('Journalist', JournalistSchema);