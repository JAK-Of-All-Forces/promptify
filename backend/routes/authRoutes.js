const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.get("/login-url", authController.getLoginUrl);

router.get("/callback", authController.handleCallback);

router.get("/refresh-token/:spotifyId", authController.refreshAccessToken);


module.exports = router;
