const prisma = require("../models/prismaClient");



exports.getById = async (req, res) => {
  const id = String(req.params.id);

  const playlist = await prisma.playlist.findUnique({ where: { id } });
  if (!playlist) {
    return res.status(404).json({ error: "Playlist not found!" });
  }
  res.json(playlist);
};