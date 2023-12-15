import  express  from "express";
import { login, register } from "../controllers/auth.controllers.js";
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

router.post('/register',
    [
        body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
        body('password', ' Minimo 6 caracteres')
        .trim()
        .isLength({min: 6}),
        body('password', ' password incorrecto').custom((value,  {req})=> {
            if(value !== req.body.repassword){
                throw new Error('No coinciden las contraseñas')
            } //custom es una validacion personalizada
            return value;
                })
    
    ], validationResultExpress ,register);


router.get('/login',
        [
            body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
            body('password', ' Minimo 6 caracteres')
            .trim()
            .isLength({min: 6}),
] ,validationResultExpress , login);



export default router;