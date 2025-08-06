const prisma = require("../models/prismaClient");

//GET all playlists (for the previous playlist section)
exports.getAll = async (req, res) => {
  try {
    //Syntax - prisma get all playlists
    const playlists = await prisma.playlist.findMany();

    //Returning all playlists
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlists." });
  }
};

//GET specific playlist (This will be used for the playlist page when wanting to view a specific playlist)
exports.getById = async (req, res) => {
  const id = String(req.params.id);

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: {
      tracks: {
        include: { track: true },
      },
    },
  });
  if (!playlist) {
    return res.status(404).json({ error: "Playlist not found!" });
  }

  res.json({
    //This function allows the playlist to only return the tracks, instead of the other attributes such as playlist id and track id every single time
    ...playlist,
    tracks: playlist.tracks.map((playlistTrack) => ({
      trackOnPlaylistId: playlistTrack.id,
      ...playlistTrack.track,
    })),
  });
};

//DELETE a specific playlist

exports.deletePlaylistById = async (req, res) => {
  const id = String(req.params.id);

  // Get the specific playlist from the database
  const playlist = await prisma.Playlist.findUnique({ where: { id } });

  if (!playlist) {
    return res.status(404).json({ error: "This playlist was not found" });
  }

  try {
    await prisma.Playlist.delete({ where: { id } });
    //Res statuses are absolutely necessary when deleting unless the frontend will constantly be in limbo
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete track on playlist" });
  }
};