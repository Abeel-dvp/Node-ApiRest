import express from 'express';
import dotenv from 'dotenv';
import  './database/connectDB.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";




//7:01hs
dotenv.config();
const app = express();

const whiteList= [process.env.ORIGIN1, process.env.ORIGIN2];


app.use(cors({
    origin: function(origin, callback){
        console.log("?? =>", origin);
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback(
            "Error de CORS origin: " + origin + "No autorizado"
        )
    }
}));

app.use(express.json());
app.use(cookieParser());

//ejemplo back redirect opcional
app.use("/", redirectRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);


//solo paraa el ejem de token y login
//app.use(express.static("public"));


const PORT = process.env.PORT || 5000

 app.listen(PORT, ()=> console.log(`Server levantado http://localhost:${PORT}`));
 