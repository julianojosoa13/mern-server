import express from 'express'
import 'dotenv/config'

import './db'
import { MONGO_PORT } from './utils/variables' 
import authRouter from './routers/auth'

const app = express()

// register our middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/auth', authRouter)
app.listen(MONGO_PORT, () => {
    console.log("App is listening on PORT " + MONGO_PORT + "...")
})