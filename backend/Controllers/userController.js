const prisma = require("../models/prismaClient");


//GET specific user (This will be needed to access information regarding the user's playlists and other information

exports.getPreviousPlaylistsByUser = async (req, res) => {
    const spotifyId = String(req.params.spotifyId);
  
    try{
      const user = await prisma.user.findUnique({
        where: { spotifyId },
        include: {
          playlists: {
            select: {
              id: true,
              name: true,
              image_url: true,
              createdAt: true,
            },
          },
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      //This allows to only extract the playlist infromation
      res.json(user.playlists);
    }
  catch (err){
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });

  }
  };