import mongoose from "mongoose";

const URI = process.env.MONGO_URI as string

const db = mongoose.connect(URI).then(() => {
    console.log("db is connected")
}).catch((err) =>{
    console.error('db connection failed ' + err)
})