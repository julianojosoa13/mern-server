import mongoose from "mongoose";
import { MONGO_URI } from "#/utils/variables"; 

const db = mongoose.connect(MONGO_URI).then(() => {
    console.log("db is connected")
}).catch((err) =>{
    console.error('db connection failed ' + err)
})