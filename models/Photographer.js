const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

const PhotographerSchema = new mongoose.Schema({
    title: {
         type: String,
          required: true
         },
    caption: { 
        type: String,
        required: true
     },
     email: {
         type: String,
     },
    location: { 
        type: String,
        required: true 
    },
    balance: {
        type: Number,
        default: 0,
    },
    image: { 
        type: String,
        required: true
     }
});

const Photographer = mongoose.model('Photographer', PhotographerSchema);

module.exports = { Photographer, upload };