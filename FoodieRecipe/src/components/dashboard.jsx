import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './dashboard.css';
import Foodie from './Foddie.png';

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get('https://food-1-ccis.onrender.com/api/recipes');
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
    const recipe = recipes.find(r => r._id === recipeId);
    if (recipe) {
      const isAlreadyFavorite = favorites.some(fav => fav._id === recipeId);
      if (!isAlreadyFavorite) {
        setFavorites(prev => [...prev, recipe]);
      }
    }
  };

  const handleBatchAddFavorites = () => {
    const newFavorites = selectedRecipes.reduce((acc, id) => {
      const recipe = recipes.find(r => r._id === id);
      if (recipe && !favorites.some(fav => fav._id === id)) {
        acc.push(recipe);
      }
      return acc;
    }, []);
    if (newFavorites.length > 0) {
      setFavorites(prev => [...prev, ...newFavorites]);
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
              <input  type="text"  value={search}  placeholder="Search recipes..." onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="favorites-btn" onClick={toggleFavoritesSlider}>  <FaHeart className="heart-icon" /> Favorites  </button>
          </div>
        </nav>
      </header>

      {favoritesVisible && (
        <div id="yourFavouriteRecipe" className="favorites-slider">
            <h3>Your Favorites</h3>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((fav, index) => (
                <li key={fav._id || index}>{fav.title}</li>
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
                <img  src={recipe.image}  alt={recipe.title}  className="recipe-image"  onError={(e) => { e.target.src = '/fallback-image.jpg'; }}  />

                <input  type="checkbox" style={{display:"none"}}  checked={selectedRecipes.includes(recipe._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRecipes(prev => [...prev, recipe._id]);
                    } else {
                      setSelectedRecipes(prev => prev.filter(id => id !== recipe._id));
                    }
                  }}
                />
                <button  className="favorite-btn"  onClick={() => handleAddFavorite(recipe._id)}  >  <FaHeart />  </button>
            
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
