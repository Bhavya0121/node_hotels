const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

router.post('/',async (req,res)=>{
    try{
      const data = req.body //Assumng the request body contains the person data
  
      //create new person document using the Mongoose model
      const newPerson = new Person(data);
      //Save the new person to the database
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({err: 'Internal Server Error'});
    }
  })

  router.get('/',async(req,res)=>{
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({err: 'Internal Server Error'});
  
    }
  })

  router.get('/:workType',async(req,res)=>{
  
    try{
      const workType = req.params.workType;
      if(workType =='chef' || workType =='manager'|| workType == 'waiter'){
        const response = await Person.find({work:workType});
        console.log('data fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'Invalid work type'})
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever error'});
  
    }
  })

  router.put('/:id',async(req,res)=>{
    try{
      const personId = req.params.id; //Extract the id from the URL parameter
      const updatedPersonData = req.body; //Updated data for the person

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
      new : true, //return updated document
      runValidators:true,  //Run Mongoose Validation 
      })

      if(!response){
        return res.status(404).json({err:'Person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);

    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server error'});


    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
      const personId = req.params.id;

      const response = await Person.findByIdAndDelete(personId);
      if(!response){
        return res.status(404).json({err:'Person not found'});
      }
      console.log('data deleted');
      res.status(404).json({message:'Person deleted Successfully'});

    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server error'});

    }
  })


  module.exports = router;
  