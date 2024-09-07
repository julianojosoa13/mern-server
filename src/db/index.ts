import mongoose from "mongoose";
import { MONGO_DB_PASSWORD, MONGO_DB_USER } from "#/utils/variables";

const MONGO_URI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@mytestdb.ve8km.mongodb.net/?retryWrites=true&w=majority&appName=MyTestDB`;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db connection failed: ", err);
  });
