const express = require('express');
const router = express.Router();
const menuItem = require('./../models/MenuItem')

router.post('/',async(req,res)=>{
    try{
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server Error'});
  
    }
  })
  
  router.get('/',async(req,res)=>{
    try{
      const data = await menuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server Error'});
  
    }
  })

  //comment added
module.exports = router;