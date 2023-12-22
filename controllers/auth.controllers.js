import { User } from "../models/userMdb.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";



export const register = async (req, res)=>{
 
    const {email, password} = req.body;
    
    try {
        
        
        //alternativa buscando por email
        let user= await User.findOne({email});
        if (user) throw {code: 11000};


        user= new User({email, password});
        await user.save();

        //Generar el jwt token
        const {token, expiresIn} = await generateToken(user.id);

        generateRefreshToken(user.id, res);


        console.log('ok')
        return res.status(201).json({message: "Usuario Registrado", token, expiresIn})
        
    } catch (error) {
        console.error(error);

        //alternativa por defecto mongoose
        if(error.code === 11000){
            return res.status(400).json({error: 'Ya existe este usuario'});
        }

        return res.status(500).json({error: "Error de servidor"});
    }
};


export const login = async (req, res)=>{
    
    try {
        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        if (!user) return res.status(403).json({error: 'No existe este usuario'});

            //se comparan las pass
        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword)  return res.status(403).json({error: 'Password incorrecta'});


        //Generar el token JWT

        const {token, expiresIn} = await generateToken(user.id);

            generateRefreshToken(user.id, res);
        

        return res.json( {token, expiresIn});
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error de servidor"});
    }
    
    
   
};

export const infoUser= async(req, res) =>{

    try {
        const user = await User.findById(req.uid).lean()
      return res.json({email: user.email, uid: user.uid })
    } catch (error) {

    
        console.log(error.message);
        return res.status(500).json({ error: "error de server" });
    }
} 

export const refreshToken = async (req, res)=>{
    try {
       
        const {token, expiresIn} = await generateToken(req.uid);

        return res.json({ token, expiresIn});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "error de server" });
    }
};


export const logOut = async(req, res) =>{
    res.clearCookie('refreshToken');
    res.json({ok: true})
}