import express from 'express'
import core from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'


const app = express()


// middleware
app.use(core({
    credentials : true,
    origin : process.env.CLIENT_URL
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(morgan())


// all router
import userRoutes from './src/router/user.router.js'

app.use('/api/v1/user' , userRoutes)


export default app