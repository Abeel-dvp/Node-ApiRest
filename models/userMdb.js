import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
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


   if(!user.isModified('password')) return next()

    try {
       const salt = await bcryptjs.genSalt(15);
       user.password = await bcryptjs.hash(user.password, salt)
        next()
   
    } catch (error) {
        console.error(error);
        throw new Error('fallo el hash de la contraseña');
    }
})

export const User = model('User', userSchema);