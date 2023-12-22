import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";


export const getLinks = async(req, res) =>{
    try {
      const links = await Link.find({uid: req.uid });

      return res.json({links});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'error de servidor'})
    }
};

export const getLink = async (req, res)=>{
  try {
    const {shortLink} = req.params;
    const link = await Link.findOne({shortLink});

    if(!link) return res.status(404).json({error: 'No existe el link'});

    console.log(link);
    return res.json({ longLink: link.longLink});
  } catch (error) {
      console.error(error);

      if(error.kind === "ObjectId"){
      return res.status(403).json({error: 'Formato id incorrecto'})

      }

      return res.status(500).json({error: 'error de servidor'})
  }
}


//Crud tradicional
export const getLinkCRUD = async (req, res)=>{
  try {
    const {id} = req.params;
    const link = await Link.findById(id );

    if(!link) return res.status(404).json({error: 'No existe el link'});

     
    if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'No existe el link en tu sesion'});

    console.log(link);
    return res.json({link});
  } catch (error) {
      console.error(error);

      if(error.kind === "ObjectId"){
      return res.status(403).json({error: 'Formato id incorrecto'})

      }

      return res.status(500).json({error: 'error de servidor'})
  }
}


export const createLinks = async(req, res) =>{
    try {
      let {longLink} = req.body;
      if(!longLink.startsWith('https://')){
        longLink = 'https://' + longLink;
    }
  

        const link = new Link({longLink, shortLink: nanoid(6), uid: req.uid});
         const newLink =   await link.save();
      return res.status(201).json({newLink});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'error de servidor'})
    }
};


export const removeLink = async (req, res)=>{
  try {
    const {id} = req.params;
    
    const link = await Link.findById(id );

    if(!link) return res.status(404).json({error: 'No existe el link'});

     
    if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'No existe el link en tu sesion'});

    await link.deleteOne();
    

    return res.json({link, message: "link eliminado correctamente"});
  } catch (error) {
      console.error(error);

      if(error.kind === "ObjectId"){
      return res.status(403).json({error: 'Formato id incorrecto'})

      }

      return res.status(500).json({error: 'error de servidor'})
  }
}

export const updateLink = async(req, res)=>{
  try {
    const {id} = req.params;
    const {longLink} = req.body;

    console.log(longLink);

    if(!longLink.startsWith('https://')){
      longLink = 'https://' + longLink;
    }
    const link = await Link.findById(id );

    if(!link) return res.status(404).json({error: 'No existe el link'});

     
    if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'No existe el link en tu sesion'});

   //actualizar
    link.longLink = longLink;
    await link.save();

    return res.json({link, message: "link modificado correctamente"});
  } catch (error) {
      console.error(error);

      if(error.kind === "ObjectId"){
      return res.status(403).json({error: 'Formato id incorrecto'})

      }

      return res.status(500).json({error: 'error de servidor'})
  }
}