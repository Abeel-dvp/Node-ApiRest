import { User } from "../models/userMdb.js";



export const register = async (req, res)=>{
 
    const {email, password} = req.body;
    
    try {
        const user= new User();
    } catch (error) {
        console.error(error);
    }
};


export const login = async (req, res)=>{
    res.json({ok: 'login'});
};
