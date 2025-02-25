import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './main.css';

const RecipeView = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${715415}/information?apiKey=423b75a73fc844d681880d9848568cc1`
        );
        setRecipe(response.data);
      } catch {
        console.log('Error fetching recipe details:');
        setError('Failed to fetch recipe details.');
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div className="loading">Loading recipe details...</div>;
  }

  return (
    <div className="recipe-view-container">
      <header className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <span className="meta-item">Ready in {recipe.readyInMinutes} minutes</span>
          <span className="meta-item">Servings: {recipe.servings}</span>
          <span className="meta-item">Health Score: {recipe.healthScore}</span>
        </div>
      </header>

      <div className="recipe-image-container">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image"
          onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
        />
      </div>

      <section className="recipe-summary">
        <h2>Overview</h2>
        {/* Recipe summary can contain HTML tags from Spoonacular */}
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      </section>

      <section className="recipe-details">
        {recipe.dishTypes && recipe.dishTypes.length > 0 && (
          <div className="detail-item">
            <strong>Dish Types:</strong> {recipe.dishTypes.join(', ')}
          </div>
        )}
        {recipe.cuisines && recipe.cuisines.length > 0 && (
          <div className="detail-item">
            <strong>Cuisines:</strong> {recipe.cuisines.join(', ')}
          </div>
        )}
        {recipe.diets && recipe.diets.length > 0 && (
          <div className="detail-item">
            <strong>Diets:</strong> {recipe.diets.join(', ')}
          </div>
        )}
        {recipe.occasions && recipe.occasions.length > 0 && (
          <div className="detail-item">
            <strong>Occasions:</strong> {recipe.occasions.join(', ')}
          </div>
        )}
        {recipe.sourceUrl && (
          <div className="detail-item">
            <strong>Source:</strong>{' '}
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
              View Original Recipe
            </a>
          </div>
        )}
      </section>

      {recipe.nutrition && recipe.nutrition.nutrients && (
        <section className="nutrition-container">
          <h2>Nutritional Information</h2>
          <div className="nutrient-list">
            {recipe.nutrition.nutrients.map((nutrient, idx) => (
              <div key={idx} className="nutrient-item">
                <span className="nutrient-name">{nutrient.name}:</span>
                <span className="nutrient-value">
                  {nutrient.amount} {nutrient.unit}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RecipeView;
