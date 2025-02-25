import { user } from "../models/user.model.js";
import { food } from "../models/food.model.js";
import { fav } from "../models/facourite.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Registration
const UserRegister = async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const newuser = { name, username, email, phone, password };
    const existingUser = await user.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "User exists" });
    await user.create(newuser);
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ msg: "Bad request" });
    }
    const data = await user.findOne({ email });
    if (!data) {
      return res.status(404).json({ msg: "User not found, please sign up" });
    }
    const token = jwt.sign({ id: data._id, name: data.name }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Get Recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await food.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post Recipes
const postRecipes = async (req, res) => {
  let { data } = req.body;
  try {
    await food.insertMany(data);
    res.json("Data uploaded successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a Recipe to Favorites
const FavouriteList = async (req, res) => {
  const { userid, recipeId } = req.body;
  if (!userid || !recipeId) {
    return res.status(400).json({ msg: "Bad request" });
  }
  try {
    const favItem = await fav.create({ userid, recipeId });
    res.status(201).json({ message: "Added to favorites", favItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Favorite Recipes
const FavouriteListget = async (req, res) => {
  try {
    const favorites = await fav.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving favorites", error: error.message });
  }
};

// Remove a Recipe from Favorites
const RemoveFavourite = async (req, res) => {
  const { recipeId } = req.params;
  try {
    await fav.findOneAndDelete({ recipeId });
    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error: error.message });
  }
};

export { 
  UserRegister, 
  UserLogin, 
  getRecipes, 
  postRecipes, 
  FavouriteList, 
  FavouriteListget, 
  RemoveFavourite 
};
