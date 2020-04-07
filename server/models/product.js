let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemPictureUrl: {
    type: String,
    required: true
  },
  itemPictureUrlLarge: {
    type: String,
    required: true,
    default: ''
  },
  itemDescription: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  itemRating: {
    type: Number,
    required: true,
    default: 0
  },
  dateAdded: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
})



let Product = module.exports = mongoose.model('Product', productSchema);