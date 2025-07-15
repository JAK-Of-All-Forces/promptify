const express = require("express")
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/login-url", controller.getLoginUrl);

router.get("/callback", controller.handleCallback);

router.get("/refresh-token/:spotifyId", controller.refreshAccessToken);


module.exports = router;