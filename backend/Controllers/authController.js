const prisma = require("../models/user");

exports.create = async (req,res) =>{
    const {spotifyId, email, displayName, playlists, accessToken, refreshToken} = req.body; 


    try{
       const user = await prisma.user.upsert({
        //upsert is the same as create but it does not allow duplicates 
        where: { spotifyId: data.spotifyId },
         update: {
         accessToken: data.accessToken,
         refreshToken: data.refreshToken,
        },
        create: {
         ...data
        }
            });

        res.status(201).json(user);

    }catch(error){
        res.status(400).json(error); 
    }
}