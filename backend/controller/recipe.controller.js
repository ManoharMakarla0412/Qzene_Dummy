const Recipe = require('../models/recipe.model');
const cloudinary = require('../config/cloudinary.config');

const createRecipe = async (req, res) => {
  try {
    const { recipeImage, ...recipeData } = req.body;

    // Upload image to Cloudinary if provided
    let imageUrl;
    if (recipeImage) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(recipeImage, {
          folder: 'recipes',
          resource_type: 'auto',
          format: 'jpg'
        });
        imageUrl = uploadResponse.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(400).json({
          success: false,
          error: 'Image upload failed'
        });
      }
    }

    // Validate required fields
    if (!recipeData.name) {
      return res.status(400).json({
        success: false,
        error: 'Recipe name is required'
      });
    }

    // Create recipe with image URL
    const recipe = new Recipe({
      ...recipeData,
      recipeImage: imageUrl
    });

    await recipe.save();

    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating recipe'
    });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching recipe'
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Error updating recipe'
    });
  }
};

// Add new function to update recipe status
const updateRecipeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add getAllRecipes function
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createRecipe,
  getRecipe,
  updateRecipe,
  getAllRecipes,
  updateRecipeStatus
};