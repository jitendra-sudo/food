import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import './dashboard.css';
import axios from "axios"

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/recipes');
        const data = response.data;  
        console.log(data);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };
    handleFetch();
  }, []);

  useEffect(() => {
    const filtered = search.length > 0
      ? recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(search.toLowerCase())
        )
      : recipes;
    setFilteredRecipes(filtered);
  }, [search, recipes]);




  const handleAddFavorite = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      const alreadyFavorited = favorites.some(fav => fav.id === recipeId);
      if (!alreadyFavorited) {
        setFavorites((prev) => [...prev, recipe]);
      }
    }
  };

  // Toggle the visibility of the favorites slider
  const toggleFavoritesSlider = () => {
    setFavoritesVisible(!favoritesVisible);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <nav className="nav-container">
          <img src="/path/to/logo.png" alt="FoodieRecipe" className="logo" />
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={search}
                placeholder="Search recipes..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="favorites-btn" onClick={toggleFavoritesSlider}>
              <FaHeart className="heart-icon" /> Favorites
            </button>
          </div>
        </nav>
      </header>

      {/* Favorites Slider */}
      {favoritesVisible && (
        <div id="yourFavouriteRecipe" className="favorites-slider">
          <h3>Your Favorites</h3>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((fav, index) => (
                <li key={fav.id || index}>{fav.title}</li>
              ))}
            </ul>
          ) : (
            <p>No favorite recipes added yet.</p>
          )}
        </div>
      )}

      <div className="Main-body">
        <main className="recipe-grid">
          {filteredRecipes.map((recipe, index) => (
            <article key={recipe.id || index} className="recipe-card">
              <div className="card-header">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                  onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
                />
                <button
                  className="favorite-btn"
                  onClick={() => handleAddFavorite(recipe.id)}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="card-body">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-summary">
                  <strong>Summary:</strong> {recipe.summary}
                </p>
                <div className="nutrition-badge">
                  <div className="nutrients">
                    {recipe.nutrition &&
                      recipe.nutrition.nutrients &&
                      recipe.nutrition.nutrients.map((nutrient, idx) => (
                        <span key={idx}>
                          {nutrient.name}: {nutrient.amount} {nutrient.unit}
                        </span>
                      ))}
                  </div>
                  <div className="ingredients">
                    <strong>Ingredients: </strong>
                    {recipe.nutrition &&
                      recipe.nutrition.ingredients &&
                      recipe.nutrition.ingredients.join(', ')}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
