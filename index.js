import express, { json } from 'express';
import  './database/connectDB.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';


//2:10:30hs
dotenv.config();
const app = express();
app.use(express.json())

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5000

 app.listen(PORT, ()=> console.log(`Server levantado http://localhost:${PORT}`));
 