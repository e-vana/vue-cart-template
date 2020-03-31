//Setup imports
const express = require('express');
const router = express.Router();
// const Product = require("../models/product");
const Review = require("../models/review");

const tokenBlacklist = require("../models/tokenBlacklist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

//Util Functions
const catchErrors = require("../util/catchErrors");
const isAdmin = require("../util/isAdmin");
const checkToken = require("../util/checkToken");

//CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Get all reviews
router.get('/', catchErrors(async (req, res) => {
  var reviews = await Review.find();
  if(reviews){
    res.send(reviews);
  } else {
    throw { message: "No reviews found."}
  }
}));


// Get reviews for a particular product
router.get('/:id', catchErrors(async (req, res) => {
  var review = await Review.find({ _id: req.params.id });
  if(review){
    res.send(review);
  } else {
    throw { message: "No review found."}
  }
}));

router.post('/', catchErrors(async (req, res) => {

  const newReview = new Review({
    reviewerName: req.body.reviewerName,
    reviewText: req.body.reviewText,
    reviewRating: req.body.reviewRating,
    reviewFor: req.body.reviewFor,
    dateAdded: Date.now()
  });

  var save = await newReview.save();
  if(save){
    res.send(save);
  }else {
    throw { message: "Error saving new review."}
  }

}))
module.exports = router;
