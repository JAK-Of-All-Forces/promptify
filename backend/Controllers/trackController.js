const prisma = require("../models/prismaClient");


//Controller for getting all playlist tracks
//GET
exports.getAllPlaylistTracks = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const allTracks = await prisma.playlist.findUnique({
      where: { id },
      include: {
        cards: true,
      },
    });

    if (!allTracks) {
      return res
        .status(404)
        .json({ error: "Tracks for this board cannot be found!" });
    }

    res.json(allTracks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};