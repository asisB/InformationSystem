const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
   departmentName: {
       type: String,
       required: true
   },
   balance: {
       type: Number,
       default: 0
   }
});

module.exports = mongoose.model('AccountDepartment', AccountSchema);