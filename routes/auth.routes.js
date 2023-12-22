import  express  from "express";
import { infoUser, logOut, login, refreshToken, register } from "../controllers/auth.controllers.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requiereRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = express.Router();

router.post('/register', bodyRegisterValidator,register);
router.post('/login', bodyLoginValidator, login);
router.get('/protected', requireToken , infoUser)
router.get('/refresh', requiereRefreshToken ,refreshToken);
router.get('/logout', logOut);


export default router;