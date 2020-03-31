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
    required: true
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
  }
})



let Product = module.exports = mongoose.model('Product', productSchema);