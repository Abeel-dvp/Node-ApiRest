import  Jwt  from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = async(req,res,next)=>{
    try {
        let token = req.headers?.authorization;
        if (!token) {
            throw new Error('No Bearer')
        }

        //SPLIT convierte el string en un array, 
        //teniendo en cuenta que un array comienza en 0,
        // usamos el 2do elemento que seria el token en este caso
        token= token.split(" ")[1]
        //verificamos el token
       const {uid} = Jwt.verify( token, process.env.JWT_SECRET)
       req.uid = uid;
       
       next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({error: tokenVerificationErrors[error.message]});
           
    }
};