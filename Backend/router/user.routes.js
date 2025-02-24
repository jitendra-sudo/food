import  {Router} from 'express';
import { UserRegister,UserLogin,getRecipes,postRecipes } from "../controller/food.user.control.js";
const router = Router();

router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.get('/recipes', getRecipes);
router.post('/recipes', postRecipes);

export {router};