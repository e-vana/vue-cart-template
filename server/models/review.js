let mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  reviewFor: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  reviewRating: {
    type: Number,
    required: true,
    default: 0
  },
  numberOfRatings: {
    type: Number,
    required: true,
    default: 0
  },
  dateAdded: {
    type: Date,
    required: true
  }
})



let Review = module.exports = mongoose.model('Review', reviewSchema);