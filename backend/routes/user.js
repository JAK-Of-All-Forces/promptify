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



function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

    
      req.userId = user.id;
     

      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const timeRangeMap = {
  "4w": "short",
  "6m": "medium",
  "1y": "long",
};

// TOP TRACKS
router.get("/top-tracks/:range", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const range = req.params.range;

  if (!timeRangeMap[range]) {
    return res.status(400).json({ error: "Invalid time range" });
  }

  const stats = await prisma.userStats.findUnique({
    where: { userId },
    select: { topTracks: true },
  });

  if (!stats || !stats.topTracks) {
    return res.status(404).json({ error: "No top tracks data found" });
  }

  res.json(stats.topTracks[timeRangeMap[range]]);
}));

// TOP ALBUMS
router.get("/top-albums/:range", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const range = req.params.range;

  if (!timeRangeMap[range]) {
    return res.status(400).json({ error: "Invalid time range" });
  }

  const stats = await prisma.userStats.findUnique({
    where: { userId },
    select: { topAlbums: true },
  });

  if (!stats || !stats.topAlbums) {
    return res.status(404).json({ error: "No top albums data found" });
  }

  res.json(stats.topAlbums[timeRangeMap[range]]);
}));

// TOP ARTISTS
router.get("/top-artists/:range", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const range = req.params.range;

  if (!timeRangeMap[range]) {
    return res.status(400).json({ error: "Invalid time range" });
  }

  const stats = await prisma.userStats.findUnique({
    where: { userId },
    select: { topArtists: true },
  });

  if (!stats || !stats.topArtists) {
    return res.status(404).json({ error: "No top artists data found" });
  }

  res.json(stats.topArtists[timeRangeMap[range]]);
}));

// TOP GENRES
router.get("/top-genres/:range", asyncHandler(async (req, res) => {
  const userId = req.userId;
  const range = req.params.range;

  if (!timeRangeMap[range]) {
    return res.status(400).json({ error: "Invalid time range" });
  }

  const stats = await prisma.userStats.findUnique({
    where: { userId },
    select: { topGenres: true },
  });

  if (!stats || !stats.topGenres) {
    return res.status(404).json({ error: "No top genres data found" });
  }

  res.json(stats.topGenres[timeRangeMap[range]]);
}));





module.exports = router;