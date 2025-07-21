const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const controller = require("../Controllers/tracksOnPlaylistController");


//Get all tracks given the playlist id
router.get("/:id", controller.getAll);

module.exports = router;