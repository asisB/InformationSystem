const express = require('express');
const router = express.Router();
const Journalist = require('../models/Journalist');
const Photographer = require('../models/Photographer');
const Invoice = require('../models/Invoice');
const AccountDepartment = require('../models/AccountDepartment');


//Gets Back all the accountDepartment 
router.get('/', async (req, res, next) => {
    try{
       const accountDepartment = await AccountDepartment.find();
        res.status(200).send(accountDepartment);
    }catch (err) {
        res.status(404).json({message: err});
    }
    if(!accountDepartment) {
        return res.status(404).json({message: "No Account Department found"});
    }
    return res.status(200).json({accountDepartment})
    });

//Submit the accountDepartment 
router.post('/', async (req, res) => {
    const accountDepartment = new AccountDepartment({
        departmentName: req.body.departmentName,
        balance: req.body.balance
    });
  try{
    const saveAccountDepartment = await accountDepartment.save();
    res.json(saveAccountDepartment);
  }catch(err) {
      res.status(404).json({message: err});
  }
});


router.post('/transferJournalist', async (req, res) => {
    try{
        //finding journalist by id
        const journalist = await Journalist.findById(req.body.journalistId);
        if(!journalist){
            throw new Error("Journalist not found");
        }
        // if(!journalist.balance){
        //     journalist.balance = 0;
        // }
        // Find the account department by their ID
    const accountDepartment = await AccountDepartment.findById(req.body.accountDepartmentId);
    if(!accountDepartment){
        throw new Error("Account Department not found");
    }
    // if(!accountDepartment.balance) {
    //    accountDepartment.balance = 0;
    // }

    // Check if the account department has enough balance
    if (accountDepartment.balance < req.body.amount) {
      throw new Error("Account department doesn't have enough balance");
    }
     // Creating the invoice
     const invoice = new Invoice({
        amount: req.body.amount,
        from: accountDepartment._id,
        to: journalist._id,
        date: new Date()
      });

      await invoice.save();
    // Decrease the account department balance
    accountDepartment.balance -= req.body.amount;
    await accountDepartment.save();
    // Increase the journalist balance
    journalist.balance += req.body.amount;
    await journalist.save();
    res.json({ message: 'Transfer successful', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/transferPhotographer', async (req, res) => {
    try{
        //finding journalist by id
        const photographer = await Photographer.findById(req.body.photographerId);
        if(!photographer){
            throw new Error("Journalist not found");
        }
        if(!photographer.balance){
            photographer.balance = 0;
        }
        // Find the account department by their ID
    const accountDepartment = await AccountDepartment.findById(req.body.accountDepartmentId);
    if(!accountDepartment){
        throw new Error("Account Department not found");
    }
    if(!accountDepartment.balance) {
       accountDepartment.balance = 0;
    }

    // Check if the account department has enough balance
    if (accountDepartment.balance < req.body.amount) {
      throw new Error("Account department doesn't have enough balance");
    }
     // Creating the invoice
     const invoice = new Invoice({
        amount: req.body.amount,
        from: accountDepartment._id,
        to: photographer._id,
        date: new Date()
      });

      await invoice.save();
    // Decrease the account department balance
    accountDepartment.balance -= req.body.amount;
    await accountDepartment.save();
    // Increase the journalist balance
    photographer.balance += req.body.amount;
    await photographer.save();
    res.json({ message: 'Transfer successful', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;