//Setup imports
const express = require('express');
const router = express.Router();
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

router.get('/', catchErrors(async (req, res) => {
  var products = await Product.find();
  if(products){
    res.send(products);
  } else {
    throw { message: "No featured products found."}
  }
}));


router.get('/featured-products', catchErrors(async (req, res) => {
  var product = await Product.find({featured: true})
  if(product){
    res.send(product);
  } else {
    throw { message: "No featured products found."}
  }
}));

router.get('/new-products', catchErrors(async (req, res) => {
  var product = await Product.find({}, {}, { sort: { 'dateAdded' : -1 } })
  if(product){
    res.send(product);
  } else {
    throw { message: "No new products found."}
  }
}));

router.post('/', catchErrors(async (req, res) => {
  var doesExist = await Product.findOne({itemName: req.body.itemName});
  if(doesExist){
    throw { message: "A product with this name already exists."}
  }


  const newProduct = new Product({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemPictureUrl: req.body.itemPictureUrl,
    itemDescription: req.body.itemDescription,
    featured: req.body.featured,
    dateAdded: Date.now()
  });

  var save = await newProduct.save();
  if(save){
    res.send(save);
  }else {
    throw { message: "Error saving new product."}
  }

}))
module.exports = router;
