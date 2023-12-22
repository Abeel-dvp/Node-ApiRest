
import { Link } from "../models/Link.js";

export const redirectLink = async ( req, res) => {
    try {
        const {shortLink} = req.params;
        const link = await Link.findOne({shortLink});
    
        if(!link) return res.status(404).json({error: 'No existe el link'});
    
       
        return  await res.redirect(link.longLink);
      } catch (error) {
          console.error(error);
    
          if(error.kind === "ObjectId"){
          return res.status(403).json({error: 'Formato id incorrecto'})
    
          }
    
          return res.status(500).json({error: 'error de servidor'})
      }
}