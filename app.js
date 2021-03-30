import express from 'express'
import multer from 'multer'
import userRoute from './server/routes/userRoute.js'
import blogRoute from './server/routes/blogRoute.js'

const app = express()

//middlewares
app.use(express.json())
app.use(express.static('./server/static'))

//routes
app.use('/v1/auth/user', userRoute)
app.use('/blog', blogRoute)

const PORT = 5000

app.listen(5000, () => {
    console.log("Running")
})