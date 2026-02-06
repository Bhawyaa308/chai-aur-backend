// this dotenv verion has many consistency issues, so we will use the other version
// require("dotenv").config({path:"./env"});
// that is this:
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({path:"./env"});
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error in connecting to database",error);
        throw error;
       })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
       })
})
.catch((err)=>{
    console.log("Error in connecting to database", err);
})


/*
import express from "express"
const app=express()
// we can use iffy function to connect to the database eficiently
// iske aage ham ; laga hi dete hai cuz its for cleaning purpose ki pichli line mein agar kisi coder ne ; na lagaya ho aur ye line aa jaye to dikkat ho sakti hai
;(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("Error in connecting to database",err);
        throw error;
       })
       app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
       });
    }
    catch (error) {
        console.log("Error in connecting to database", error);
        throw error;
    }
})()
    */