import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js';


const router = express.Router();

//Create Usre
router.post('/add', registerUser);
router.post('/login', loginUser);

export default router
