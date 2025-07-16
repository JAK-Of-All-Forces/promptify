const prisma = require("../models/prismaClient");





//GET all playlists (for the previous playlist section)
exports.getAll = async (req, res) => {

  try {
    //Syntax - prisma get all playlists
    const playlists = await prisma.Playlist.findMany();

    //Returning all playlists
    res.json(playlists);
  } 
  
  catch (error) {
      throw new Error(error);
  }
};


//GET specific playlist (This will be used for the playlist page when wanting to view a specific playlist)
exports.getById = async (req, res) => {
  const id = String(req.params.id);

  const playlist = await prisma.playlist.findUnique({
      where: { id } ,
      include: { tracks: 
        {
          include: {track: true}
        }
      }

  }
  );
  if (!playlist) {
    return res.status(404).json({ error: "Playlist not found!" });
  }

  res.json({
    //This function allows the playlist to only return the tracks, instead of the other attributes such as playlist id and track id every single time
    ...playlist, tracks: playlist.tracks.map(playlistTracks => playlistTracks.track)
  });
};