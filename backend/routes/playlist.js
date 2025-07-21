const express = require("express");
const router = express.Router();
const controller = require("../controllers/playlistController");
// const generatePlaylistController = require("../Controllers/generatePlaylistController");

// router.post("/createPrompt", generatePlaylistController.createPrompt);


//GET all playlists
router.get("/", controller.getAll);

//GET specifc playlist
router.get("/:id", controller.getById);


module.exports = router;