import mongoose from "mongoose";
import { config } from "dotenv";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
