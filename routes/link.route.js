import Router from "express";
import { createLinks, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controllers.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();


router.get("/", requireToken, getLinks );
router.get("/:shortLink",  getLink);
router.post("/", requireToken, bodyLinkValidator, createLinks );
router.delete("/:id", requireToken, paramLinkValidator, removeLink);
router.patch("/:id", requireToken, paramLinkValidator, bodyLinkValidator, updateLink);



export default router;
