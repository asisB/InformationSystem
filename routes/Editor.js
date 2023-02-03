const express = require('express');
const router = express.Router();
const Editor = require('../models/Editor');

//Gets Back all the editor detail 
router.get('/', async (req, res, next) => {
    try{
       const editor = await Editor.find();
        res.status(200).send(editor);
    }catch (err) {
        res.status(404).json({message: err});
    }
    if(!editor) {
        return res.status(404).json({message: "No editor found"});
    }
    return res.status(200).json({advertiser})
    });

//Submit the editor 
router.post('/', async (req, res) => {
    const editor = new Editor({
        content: req.body.content,
    });
  try{
    const saveEditor = await editor.save();
    res.json(saveEditor);
  }catch(err) {
      res.status(404).json({message: err});
  }
});

//Specific editor 
router.get('/:editorId', async (req, res) => {
    try{
      const editor = await Editor.findById(req.params.editorId);
      res.send(editor)
  
    }catch (err) {
        res.json({message: err});
    }
      
  });

  //delete specific editor 
router.delete('/:editorId', async (req, res) => {
    try{
        const removeEditor = await  Editor.remove({_id: req.params.editorId});
        res.json(removeEditor)
    }catch (err) {
        res.json({message: err});
    }
});

module.exports = router;

//

