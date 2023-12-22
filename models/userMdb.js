import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index:{unique: true},
    },
    password:{
        type: String,
        required: true
    }
});


userSchema.pre("save", async function(next){
   const user = this;


   if(!user.isModified("password")) return next()

    try {
       const salt = await bcryptjs.genSalt(15);
       user.password = await bcryptjs.hash(user.password, salt)
        next()
   
    } catch (error) {
        console.error(error);
        throw new Error('fallo el hash de la contraseña');
    }
})


//comparar las password enviada desde front con la del schema de la base de datos
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password);
}


export const User = mongoose.model('User', userSchema);