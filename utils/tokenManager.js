
import  Jwt from "jsonwebtoken";


export const generateToken= async (uid)=>{
   
   const expiresIn= 60* 15;
   
   
    try {
       const token=  Jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.error(error);
    }
}



export const generateRefreshToken = async (uid, res)=>{
    const expiresIn = 60 * 60* 24 * 30

    try {
        const refreshToken = await Jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn});
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
            
        });
    } catch (error) {
        console.error(error);
    }
};

export const tokenVerificationErrors= {
    ["invalid signature"]: "La firma del jwt no es valida",
    ["jwt expired"]: "Jwt ha expirado",
    ["invalid token"]: "Token invalido",
    ["No Bearer"]: "Utiliza formato Bearer",
    ["jwt malformed"]: "Token formato no valido",
};