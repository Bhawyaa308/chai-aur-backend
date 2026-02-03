import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('\n MongoDB connected to host: ${connectionInstance.connection.host} \n');
    } catch (error) {
        console.log("Error in connecting to database", error);
        process.exit(1);
    }
};

export default connectDB;