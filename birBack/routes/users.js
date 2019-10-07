const express = require('express');
const router = express.Router();
const User = require('../models/user');
const View = require('../models/views');
const Comment = require('../models/comment');
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require("../config/check-auth");

// router.post('/register', function(req, res, next) {
//   addToDB(req, res);
// });

// async function addToDB(req, res) {

//   var user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: User.hashPassword(req.body.password),
//     creation_dt: Date.now()
//   });

//   try{
//     doc = await user.save();
//     return res.json(doc);
//   }
//   catch(err) {
//     return res.json(err);
//   }
// }

router.post('/register', function(req, res, next){
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      creation_dt: Date.now()
    });
    user.save()
    .then(result => {
      res.json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.json({
       error: err
    });
  });
});
});

// router.post('/login', function(req, res, next){
//     passport.authenticate('local', function(err, user, info) {
//       console.log("user",user, info)
//       if (err) { return res.json(err); }
//       if (!user) { return res.json(info); }
//       req.logIn(user, function(err) {
//         if (err) { return res.json(err); }
//         return res.json({ message: 'Logged in Successfully', user: user});
//       });
//     })(req, res, next);
//   });

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

  router.get('/welcome', function(req, res, next){
    View.find().then(documents => {
      res.status(200).json({
        message: 'Restaurants Fetched Successfully',
        views: documents
      });
    });
});
    

  router.get('/dashboard', checkAuth,  function(req,res, next) { 
     return res.json(req.user);
  });

  router.get('/logout', checkAuth, function(req, res, next) {
    req.logout();
    return res.json({ message: 'Logout Success'});
  });

  router.post('/input-forms', checkAuth, function(req, res, next) {
    console.log(req.body);   
    var restaurantUser = new View({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      openHours: req.body.openHours,
      closeHours: req.body.closeHours,
      phoneNo: req.body.phoneNo,
      cuisine: req.body.cuisine,
      goodFor:req.body.goodFor
    });
    console.log(restaurantUser);
    restaurantUser.save();
    res.json({
      message: 'Restaurant added successfully'
    });
  });

router.post('/addComments', checkAuth, function(req, res, next){
  console.log("dfdvd",req.body);
  var restData = {"_id": mongoose.Types.ObjectId(req.body.id)}
  var data = { $push: {comments:{comment: req.body.comment, username:req.body.name }}}
    View.findOneAndUpdate(restData, data, function (err, restaurant){
       if(err){
         console.log(err);
       }
      else{
        console.log(restaurant)
        res.json({message: 'Comment added successfully'});
      }




      });
  });
  
  router.post('/moreInfo', checkAuth, (req,res,next)=>{
    console.log("req",req.body);
    var restData = {"_id": mongoose.Types.ObjectId(req.body.id)}
    View.findById(restData,(err, foundRestaurant)=>{
      console.log('baby', foundRestaurant);
      if(err){
          console.log(err)
      } else {
        res.json(foundRestaurant);
      } 
    });
  });

  router.get('/restaurant-info', function(req, res, next){
    View.find().then(documents => {
      res.status(200).json({
        message: 'Welcome to Restaurant',
        views: documents
      });
   });
});

  // function isValidUser(req, res, next) {
  //   if(req.isAuthenticated()) next();
  //   else return res.json({ message: 'Unauthorized Request'});
  // }

module.exports = router;
