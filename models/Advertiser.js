const mongoose = require('mongoose');

const AdvertiserSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   advertisement_type: {
       type: String,
       required: true
   }

});

module.exports = mongoose.model('Advertiser', AdvertiserSchema);