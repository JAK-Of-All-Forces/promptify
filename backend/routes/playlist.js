const express = require("express");
const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
// const controller = require("../controllers/playlistController");
// const generatePlaylistController = require("../Controllers/generatePlaylistController");

// router.post("/createPrompt", generatePlaylistController.createPrompt);

module.exports = router;
