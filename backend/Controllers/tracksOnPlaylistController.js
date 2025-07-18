const prisma = require("../models/prismaClient");

//GET all tracks on playlists
exports.getAll = async (req, res) => {
  const playlistId = req.params.playlistId;
  
  try {
    //Syntax - prisma get all tracks on playlists
    const tracksOnPlaylists = await prisma.tracksOnPlaylists.findMany(
      {
        where: {playlistId},
        include: {
          track: true,
        },
        

      }

    );
    //Returning all tracks on playlists
    res.json(tracksOnPlaylists);
  } 
  
  catch (error) {
      throw new Error(error);
  }
};