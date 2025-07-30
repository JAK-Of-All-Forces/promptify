const express = require("express");
const router = express.Router();
const controller = require("../Controllers/playlistController");
const generatePlaylistController = require("../Controllers/generatePlaylistController");
const genresController = require("../Controllers/genresController");

router.post("/createPrompt", generatePlaylistController.createPrompt);
router.get("/getGenres", genresController.getGenres);




//GET all playlists
router.get("/", controller.getAll);

//GET specifc playlist
router.get("/:id", controller.getById);


module.exports = router;