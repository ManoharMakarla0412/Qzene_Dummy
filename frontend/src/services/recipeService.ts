const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const createRecipe = async (recipeData: any) => {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create recipe');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const updateRecipe = async (id: string, recipeData: any) => {
  try {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData)
    });

    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};