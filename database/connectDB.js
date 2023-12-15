import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config()

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connect db ok');
} catch (error) {
    console.error(error)
    console.log('error de conexion a mongo db');
}