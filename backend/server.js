import app from "./index.js";
import connectDB from "./utils/connectDB.js";

connectDB;
app.listen(4500,()=>{
    console.log("Server is running on port 4500");
})