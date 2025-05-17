const express = require('express');
const { 
  createRecipe, 
  getRecipe, 
  updateRecipe, 
  getAllRecipes,
  updateRecipeStatus 
} = require('../controller/recipe.controller');

const router = express.Router();

router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);
router.get('/recipes/:id', getRecipe);
router.put('/recipes/:id', updateRecipe);
router.patch('/recipes/:id/status', updateRecipeStatus);

module.exports = router;