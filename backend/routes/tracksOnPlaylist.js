const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const controller = require("../Controllers/tracksOnPlaylistController");


//Get all tracks given the playlist id
router.get("/:id", controller.getAll);

//Delete tracks given the tracksOnPlaylists id
router.delete("/:id", controller.deleteTrackById);


module.exports = router;