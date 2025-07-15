const express = require("express")
const router = express.Router();
const authController = require("../Controllers/authController");

router.get("/login-url", authController.getLoginUrl);

router.get("/callback", controller.handleCallback);

router.get("/refresh-token/:spotifyId", controller.refreshAccessToken);


module.exports = router;