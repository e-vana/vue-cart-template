//Setup imports
const express = require('express');
const router = express.Router();
// const Product = require("../models/product");
const Review = require("../models/review");
const Product = require("../models/product");


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
  var review = await Review.find({ reviewFor: req.params.id });
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

  if(req.body.reviewRating > 5 || req.body.reviewRating < 0){
    throw {message: "Rating must be between 0 and 5."}
  }

  var saveNewReview = await newReview.save();

  //update reviewAverage
  var getReviews = await Review.find({ reviewFor: req.body.reviewFor});
  var sumRating = 0;

  for(i=0; i < getReviews.length; i++){
    sumRating = sumRating + getReviews[i].reviewRating;
  }
  var averageRating = Math.round(sumRating / getReviews.length);

  //find product being reviewed and update new average
  var fetchProduct = await Product.findOne({ _id: req.body.reviewFor });
  if(!fetchProduct){
    throw { message: `Error updating ${req.body.reviewFor} review score.`}
  }
  fetchProduct.itemRating = averageRating;
  var saveProduct = await fetchProduct.save();



  if(saveNewReview){
    res.send(saveNewReview);
  }else {
    throw { message: "Error saving new review."}
  }

}))
module.exports = router;
