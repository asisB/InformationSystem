const express = require('express');
const router = express.Router();
const Advertiser = require('../models/Advertiser');

//Gets Back all the advertiser detail 
router.get('/', async (req, res, next) => {
    try{
       const advertiser = await Advertiser.find();
        res.status(200).send(advertiser);
    }catch (err) {
        res.status(404).json({message: err});
    }
    if(!advertiser) {
        return res.status(404).json({message: "No advertiser found"});
    }
    return res.status(200).json({advertiser})
    });

//Submit the accountDepartment 
router.post('/', async (req, res) => {
    const advertiser = new Advertiser({
        name: req.body.name,
        email: req.body.email,
        advertisement_type: req.body.advertisement_type
    });
  try{
    const saveAdvertiser = await advertiser.save();
    res.json(saveAdvertiser);
  }catch(err) {
      res.status(404).json({message: err});
  }
});

//Specific advertiser 
router.get('/:advertiserId', async (req, res) => {
    try{
      const advertiser = await Advertiser.findById(req.params.advertiserId);
      res.send(advertiser)
  
    }catch (err) {
        res.json({message: err});
    }
      
  });

  //delete specific advertiser 
router.delete('/:advertiserId', async (req, res) => {
    try{
        const removeAdvertiser = await  Advertiser.remove({_id: req.params.advertiserId});
        res.json(removeAdvertiser)
    }catch (err) {
        res.json({message: err});
    }
});

module.exports = router;

//

