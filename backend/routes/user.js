const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const controller = require("../Controllers/userController");
const userDataController = require("../Controllers/userController");

// GET user profile
router.get("/profile", controller.getProfile);


//GET all playlists for the user by Spotify ID
router.get("/:spotifyId", controller.getPreviousPlaylistsByUser);




// wrapper for routes from the user data controller
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      const spotifyId = req.body.spotifyId || req.query.spotifyId;

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
      req.userId = user.id;

      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.get("/top-tracks/4w", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topTracks4(userId);
  res.json(data);
}));

router.get("/top-tracks/6m", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await userDataController.topTracks6(userId);
  res.json(data);
}));

router.get("/top-tracks/1y", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topTracks1(userId);
  res.json(data);
}));

router.get("/top-albums/4w", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topAlbums4(userId);
  res.json(data);
}));

router.get("/top-albums/6m", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topAlbums6(userId);
  res.json(data);
}));

router.get("/top-albums/1y", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topAlbums1(userId);
  res.json(data);
}));

router.get("/top-artists/4w", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topArtists4(userId);
  res.json(data);
}));

router.get("/top-artists/6m", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topArtists6(userId);
  res.json(data);
}));

router.get("/top-artists/1y", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topArtists1(userId);
  res.json(data);
}));

router.get("/top-genres/4w", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topGenres4(userId);
  res.json(data);
}));

router.get("/top-genres/6m", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topGenres6(userId);
  res.json(data);
}));

router.get("/top-genres/1y", asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const data = await topGenres1(userId);
  res.json(data);
}));



module.exports = router;