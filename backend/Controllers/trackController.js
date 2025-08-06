const prisma = require("../models/prismaClient");

//GET a specific track
exports.getById = async (req, res) => {
  const id = String(req.params.id);

  try {
    const track = await prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      return res
        .status(404)
        .json({ error: "Tracks for this board cannot be found!" });
    }

    res.json(track);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};