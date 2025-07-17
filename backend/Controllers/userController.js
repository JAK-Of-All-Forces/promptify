const prisma = require("../models/prismaClient");


//GET specific user (This will be needed to access information regarding the user's playlists and other information

//Coming back to this
exports.getPlaylistById = async (req, res) => {
    const spotifyId = String(req.params.spotifyId);
  
    const user = await prisma.user.findUnique({
      where: { spotifyId },
      include: {
        playlists: {
          include: { id: true },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
  
    res.json({
      //This function allows to only extract the playlist infromation
      ...playlist, tracks: playlist.tracks.map(playlistTracks => playlistTracks.track)
    });
  };