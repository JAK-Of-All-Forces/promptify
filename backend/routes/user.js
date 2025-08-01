const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const controller = require("../Controllers/userController");
const userDataController = require("../Controllers/userDataController");

// GET user profile
router.get("/profile", controller.getProfile);


//GET all playlists for the user by Spotify ID
router.get("/:spotifyId", controller.getPreviousPlaylistsByUser);




// wrapper for routes from the user data controller
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      const spotifyId = req.query.spotifyId;
       
      if (!spotifyId) {
        return res.status(400).json({
          error: "spotifyId is required in body or query.",
        });
      }

      const user = await prisma.user.findUnique({
        where: { spotifyId },
      });

      if (!user) {
        return res.status(404).json({
          error: "User not found for the provided spotifyId.",
        });
      }

      // Attach userId to req for use in route handlers
      // console.log("HEREEE")
      req.userId = user.id;
      // console.log("The Spotify ID is: ", spotifyId)
      // console.log("The userId is: ", req.userId)

      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.get("/top-tracks/4w", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topTracks4(userId);
  res.json(data);
}));

router.get("/top-tracks/6m", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topTracks6(userId);
  res.json(data);
}));

router.get("/top-tracks/1y", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topTracks1(userId);
  res.json(data);
}));

router.get("/top-albums/4w", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topAlbums4(userId);
  res.json(data);
}));

router.get("/top-albums/6m", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topAlbums6(userId);
  res.json(data);
}));

router.get("/top-albums/1y", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topAlbums1(userId);
  res.json(data);
}));

router.get("/top-artists/4w", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topArtists4(userId);
  res.json(data);
}));

router.get("/top-artists/6m", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topArtists6(userId);
  res.json(data);
}));

router.get("/top-artists/1y", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topArtists1(userId);
  res.json(data);
}));

router.get("/top-genres/4w", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topGenres4(userId);
  res.json(data);
}));

router.get("/top-genres/6m", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topGenres6(userId);
  res.json(data);
}));

router.get("/top-genres/1y", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const data = await userDataController.topGenres1(userId);
  res.json(data);
}));



module.exports = router;