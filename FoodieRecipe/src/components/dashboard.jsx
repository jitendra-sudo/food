import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './dashboard.css';
import Foodie from './Foddie.png';

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);


  const demoUserId = "64bf3c2f2d7e6a2e3b6bcd5a";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://food-1-ccis.onrender.com/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('https://food-1-ccis.onrender.com/api/favouritelist');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  // Filter recipes based on search input
  useEffect(() => {
    const filtered = search.length > 0
      ? recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(search.toLowerCase())
        )
      : recipes;
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.recipeId === recipeId);
  };

  const handleAddFavorite = async (recipeId) => {
    try {
      const response = await axios.post('https://food-1-ccis.onrender.com/api/favouritelist', {
        userid: demoUserId,
        recipeId
      });
      setFavorites(prev => [...prev, response.data.favItem]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await axios.delete(`https://food-1-ccis.onrender.com/api/favouritelist/${recipeId}`);
      setFavorites(prev => prev.filter(fav => fav.recipeId !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleBatchAddFavorites = async () => {
    const newFavorites = selectedRecipes.filter(recipeId => !isFavorite(recipeId));

    if (newFavorites.length > 0) {
      try {
        const promises = newFavorites.map(recipeId =>
          axios.post('https://food-1-ccis.onrender.com/api/favouritelist', { userid: demoUserId, recipeId })
        );
        const responses = await Promise.all(promises);
        const addedFavorites = responses.map(res => res.data.favItem);
        setFavorites(prev => [...prev, ...addedFavorites]);
      } catch (error) {
        console.error('Error adding batch favorites:', error);
      }
    }
    setSelectedRecipes([]);
  };

  const toggleFavoritesSlider = () => {
    setFavoritesVisible(!favoritesVisible);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <nav className="nav-container">
          <img src={Foodie} alt="FoodieRecipe" className="logo" />
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

      {favoritesVisible && (
        <div id="yourFavouriteRecipe" className="favorites-slider">
          <h3>Your Favorites</h3>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((fav, index) => (
                <li key={fav._id || index}>
                  {recipes.find(recipe => recipe._id === fav.recipeId)?.title || 'Unknown Recipe'}
                  <button onClick={() => handleRemoveFavorite(fav.recipeId)}>
                    Remove
                  </button>
                </li>
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
            <article key={recipe._id || index} className="recipe-card">
              <div className="card-header">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                  onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
                />

                {/* Hidden checkbox to allow batch selection */}
                <input
                  type="checkbox"
                  style={{ display: "none" }}
                  checked={selectedRecipes.includes(recipe._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRecipes(prev => [...prev, recipe._id]);
                    } else {
                      setSelectedRecipes(prev => prev.filter(id => id !== recipe._id));
                    }
                  }}
                />
                <button
                  className="favorite-btn"
                  onClick={() => {
                    isFavorite(recipe._id)
                      ? handleRemoveFavorite(recipe._id)
                      : handleAddFavorite(recipe._id);
                  }}
                >
                  <FaHeart color={isFavorite(recipe._id) ? "red" : "gray"} />
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

      {selectedRecipes.length > 0 && (
        <div className="batch-add-container">
          <button onClick={handleBatchAddFavorites}>
            Add Selected to Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
