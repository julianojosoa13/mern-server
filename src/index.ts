import express from 'express'
import 'dotenv/config'

import './db'
import { MONGO_PORT } from './utils/variables' 

const app = express()

app.listen(MONGO_PORT, () => {
    console.log("App is listening on PORT " + MONGO_PORT + "...")
})