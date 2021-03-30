import multer from 'multer'
import express from 'express'
import path from 'path'
import {createBlog, getBlogByUser} from '../controllers/blogController.js'
import { authenticateJWT } from '../config/auth.js';



const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../server/server/static/myuploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
 var upload = multer({ storage: storage })



//Create Usre
router.post('/create', authenticateJWT,  upload.array('avatar', 12), createBlog);
router.get('/',authenticateJWT, getBlogByUser);


export default router
