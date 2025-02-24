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


 const UserLogin=async (req,res)=>{
        const {email,password}=req.body;
        if(!password||!email){
            return res.status(400).json({msg:"bad request"})
        }
        try{
          const data= await user.findOne({email:email});
          if(!data){
            return res.status(404).json({msg:"user not found signup"})
          }
          const token =jwt.sign({id:data._id,name:data.name},process.env.ACCESS_TOKEN_SECRET)
          res.status(200).json({message:"Login success",token:token})
        }
        catch(err){
          res.status(500).json({message:"Internal server error",error:err.message})
        }
    }


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
