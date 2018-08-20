var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/users');
var router = express.Router();

const db = "mongodb://bunny:bunny1234@ds235251.mlab.com:35251/eventsdb";
mongoose.connect(db , { useNewUrlParser : true},function(error) {
  if(!error) {
    console.log('Connected to DB!');
  }else {
    console.log(error);
  }
});

router.get('/' , function(req , res) {
  res.end("Let's get started here");
});

router.get('/users' , function(req , res) {
  User.find(function(error , users) {
    if(!error) {
      res.status(200).send(users);
    }
  });
});

router.post('/user' , function(req , res) {
  let newUser = req.body;
  User.findOne( {email : newUser.email} , function(error , user) {
    if(error) {
      console.log(error);
    }else if(user) {
      res.status(400).send('User Already Exists!');
    } else {
      let user = new User(newUser);
      user.save(function(error , newuser) {
        if(error) {
          console.log(error);
        } else {
          res.status(200).send('New User Created!');
        }
      });
    }
  });
});

router.put('/user' , function(req , res) {
  let olduser = req.body;
  User.updateOne({email : olduser.email} , {password : olduser.password} , function(error , updatedUser) {
    if(error) {
      console.log(error);
    } else {
      res.status(200).send(updatedUser);
    }
  });
});

router.delete('/user' , function(req , res) {
  User.deleteOne({email : req.body.email} , function(error , user) {
    if(error) {
      console.log(error);
    } else {
      res.status(200).send(user);
    }
  });
});

module.exports = router;
