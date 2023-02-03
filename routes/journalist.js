const express = require('express');
const router = express.Router();
const Journalist = require('../models/Journalist');
const Invoice = require('../models/Invoice');
const AccountDepartment = require('../models/AccountDepartment');

//Gets Back all the journalist 
router.get('/', async (req, res, next) => {
    try{
       const journalist = await Journalist.find();
        res.status(200).send(journalist);
    }catch (err) {
        res.status(404).json({message: err});
    }
    
    });

//Submit the journalist
router.post('/', async (req, res) => {
    const journalist = new Journalist({
        title: req.body.title,
        body: req.body.body,
        email: req.body.email,
        balance: Number(req.body.balance)
    });

console.log(journalist);
console.log(req.body);

  try{
    const saveJournalist = await journalist.save();
    res.json(saveJournalist);
  }catch(err) {
      res.status(404).json({message: err});
  }
});

//Specific journalist 
router.get('/:journalistId', async (req, res) => {
    try{
      const journalist = await Journalist.findById(req.params.journalistId);
      res.send(journalist)
  
    }catch (err) {
        res.json({message: err});
    }
      
  });

  //delete specific journalist 
router.delete('/:journalistId', async (req, res) => {
    try{
        const removeJournalist = await  Journalist.remove({_id: req.params.journalistId});
        res.json(removeJournalist)
    }catch (err) {
        res.json({message: err});
    }
});


  

module.exports = router;