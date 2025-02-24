import { user } from "../models/user.model.js";
import { food } from "../models/food.model.js";
import jwt from "jsonwebtoken";
import  bcrypt from "bcrypt";

const genrateRefreshandAccessToken = async (userId) => {
    // finding user from the user id and gerating refresh token and access token
    try {
      const user = await User.findById(userId);
      const refreshToken = user.genrateRefreshToken();
      const accessToken = user.genrateAccessToken();
      user.refreshToken = refreshToken;
      // saving the refresh token in the user table
      await user.save({ validateBeforeSave: false })
      return { refreshToken, accessToken }
  
    } catch (error) {
     console.log(error)
    }
  
  }

const UserRegister = async (req, res) => {
  const {name,username,email,phone, password} =req.body;
  console.log(name)
  
  try {
    const newuser={
      name:name,
      username:username,
      email:email,
      phone:phone,
      password:password
    }
    const existingUser = await user.findOne({username:username})
    if (existingUser) return res.status(400).json({ error: "User exists" });
    await user.create(newuser);

    res.status(201).json({message:"user register"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UserLogin = async (req, res) => {
  try {
    const user = await user.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const {refreshToken,accessToken}=await genrateRefreshandAccessToken(user._id)

    const options = {
        // httpOnly: true,
        secure : true,
      }
    //   console.log(refreshToken,accessToken)
      // sending cookies and the user value
      res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({message:"user logged in successfully"})

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await food.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postRecipes = async (req, res) => {
    let {data}=req.body
    let pushRecipie=await food.insertMany(data)
    res.json("data uploades successfully")
};

export { UserRegister, UserLogin, getRecipes, postRecipes };
