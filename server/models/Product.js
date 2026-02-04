const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Food', 'Electronics', 'Clothing', 'Beauty Products', 'Others'],
    required: true
  },
  quantityStock: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  images: [{
    type: String // URLs or paths
  }],
  description: {
    type: String
  },
  exchangeEligible: {
    type: String, // "Yes" or "No" based on dropdown
    default: "Yes"
  },
  status: {
    type: String,
    enum: ['Published', 'Unpublished'],
    default: 'Published'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for now, can link to logged in user later
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
