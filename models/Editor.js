const mongoose = require('mongoose');

const EditorSchema = new mongoose.Schema({
   content: {
       type: String,
       required: true
   }
});

module.exports = mongoose.model('Editor', EditorSchema);