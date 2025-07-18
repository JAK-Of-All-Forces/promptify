const prisma = require("../models/prismaClient");


//Controller for getting a singular track
//GET
//This is possibly not neccessary but I am going to keep this here for now
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