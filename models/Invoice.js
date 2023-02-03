const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
   amount: {
       type: Number,
       required: true
   },
   from: {type: mongoose.Schema.Types.ObjectId, ref: 'AccountDepartment'},
   to: {type: mongoose.Schema.Types.ObjectId, ref: 'Journalist'},
   date: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Invoice', invoiceSchema);
