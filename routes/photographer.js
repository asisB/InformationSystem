const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Photographer } = require('../models/Photographer');

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

//Gets Back all the journalist 
router.get('/', async (req, res) => {
    try{
       const photographer = await Photographer.find();
        res.status(200).send(photographer);
    }catch (err) {
        res.status(404).json({message: err});
    }
    });

//routes for uploading photographer 
router.post('/upload', upload.single('image'), (req, res) => {

    const photographer = new Photographer({
        title: req.body.title,
        caption: req.body.caption,
        email: req.body.email,
        location: req.body.location,
        balance: Number(req.body.balance),
        image: req.file.path
    });
    //saving the photographer to the database
    photographer.save((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.json({ message: 'Photographer created successfully' });
    });
 
});

//Specific photographer 
router.get('/:photographerId', async (req, res) => {
    try{
      const photographer = await Photographer.findById(req.params.photographerId);
      res.send(photographer)
  
    }catch (err) {
        res.json({message: err});
    }
      
  });

  //delete specific photographer 
router.delete('/:photographerId', async (req, res) => {
    try{
        const removePhotographer = await  Photographer.remove({_id: req.params.photographerId});
        res.json(removePhotographer)
    }catch (err) {
        res.json({message: err});
    }
});

module.exports = router;

// try{
//     const savePhotographer = photographer.save();
//     res.json(savePhotographer);
//   }catch(err) {
//       res.status(404).json({message: err});
//   }