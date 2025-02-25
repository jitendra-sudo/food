import { Router } from 'express';
import { 
  UserRegister, 
  UserLogin, 
  getRecipes, 
  postRecipes, 
  FavouriteList, 
  FavouriteListget, 
  RemoveFavourite 
} from "../controller/food.user.control.js";

const router = Router();

router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.get('/recipes', getRecipes);
router.post('/recipes', postRecipes);
router.post("/favouritelist", FavouriteList);
router.get("/favouritelist", FavouriteListget);
router.delete("/favouritelist/:recipeId", RemoveFavourite);

export { router };
