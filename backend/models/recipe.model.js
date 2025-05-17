const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  difficulty: String,
  price: Number,
  cookingTime: Number,
  servingSize: Number,
  author: String,
  cuisine: String,
  deviceSupport: String,
  preparationRequired: Boolean,
  recipeImage: String,
  containers: [{
    id: Number,
    name: String,
    ingredients: [{
      id: String,
      name: String,
      image: String,
      quantity: Number
    }]
  }],
  seasonings: [{
    id: String,
    name: String,
    image: String,
    count: Number,
    quantity: Number
  }],
  preparationItems: [{
    id: String,
    name: String,
    image: String
  }],
  utensils: [{
    id: String,
    name: String,
    image: String
  }],
  instructions: [{
    id: String,
    step: Number,
    action: String,
    icon: String,
    serves: {
      type: Map,
      of: String
    }
  }],
  waterOil: [{
    id: String,
    name: String,
    image: String,
    quantity: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);