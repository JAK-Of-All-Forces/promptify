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


//DELETE a specific track on a playlist
exports.deleteTrackById = async (req, res) => {
  const id = String(req.params.id);

  console.log(id);

  // Get the specific trackOnPlaylist from the database
  const trackOnPlaylist = await prisma.TracksOnPlaylists.findUnique({ where: { id } });

  if (!trackOnPlaylist) {
    return res.status(404).json({ error: "This trackOnPlaylist was not found" });
  }

  try {
    await prisma.TracksOnPlaylists.delete({ where: { id } });
  }
  catch (err) {
    console.error("Failed to delete track on playlist:", err);

  }
};