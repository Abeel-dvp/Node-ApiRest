import { tokenVerificationErrors } from "../utils/tokenManager.js";
import  Jwt  from "jsonwebtoken";


export const requiereRefreshToken = async (req, res, next)=>{


    try {
        const refreshTokenCookie = await req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token");

        const {uid} = await Jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        
        req.uid = uid;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({error: tokenVerificationErrors[error.message]});
           
    }

}