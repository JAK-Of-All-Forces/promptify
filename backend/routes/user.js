const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const controller = require("../Controllers/userController");


//GET all playlists for the user by Spotify ID
router.get("/:spotifyId", controller.getPreviousPlaylistsByUser);

module.exports = router;