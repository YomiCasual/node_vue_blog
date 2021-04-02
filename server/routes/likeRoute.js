import express from 'express'
import { checkLoggedIn } from '../config/auth.js';
import { likeBlog } from '../controllers/likesController.js';


const router = express.Router()

router.post('/create/:blogId', checkLoggedIn, likeBlog);



export default router
