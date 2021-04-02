import express from 'express'
import { checkLoggedIn } from '../config/auth.js';
import { createComment } from '../controllers/commentController.js';

const router = express.Router()

router.post('/create/:blogId', checkLoggedIn, createComment);



export default router
