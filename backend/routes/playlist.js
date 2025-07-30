const express = require("express");
const router = express.Router();
const controller = require("../Controllers/playlistController");
const generatePlaylistController = require("../Controllers/generatePlaylistController");
const genresController = require("../Controllers/genresController");

router.post("/createPrompt", generatePlaylistController.createPrompt);
router.get("/getGenres", genresController.getGenres);

router.post("/testing", generatePlaylistController.testingRoutes);



//GET all playlists
router.get("/", controller.getAll);

//GET specifc playlist
router.get("/:id", controller.getById);

//DELETES playlist given the specific ID
router.delete("/:id", controller.deletePlaylistById);



module.exports = router;