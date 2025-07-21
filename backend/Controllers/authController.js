const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const frontPort = process.env.FRONT_PORT

exports.getLoginUrl = (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  res.json({ url: authUrl });
};

exports.handleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("Missing code!");

  try {
    // Make request to Spotify to get a new access token

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Get user profile
    const profileRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userProfile = profileRes.data;

    // Save user in DB
    await prisma.user.upsert({
      where: { spotifyId: userProfile.id },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        displayName: userProfile.display_name,
        email: userProfile.email,
      },
      create: {
        spotifyId: userProfile.id,
        accessToken: access_token,
        refreshToken: refresh_token,
        displayName: userProfile.display_name,
        email: userProfile.email,
      },
    });

    res.redirect(`http://localhost:${frontPort}/home?access_token=${access_token}&spotify_id=${userProfile.id}`);
  } catch (err) {
    console.error("Callback error:", err.response?.data || err.message);
    res.status(500).send("Callback failed.");
  }
};

exports.refreshAccessToken = async (req, res) => {
  const spotifyId = req.params.spotifyId;

  try {
    const user = await prisma.user.findUnique({ where: { spotifyId } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", user.refreshToken);

    const { data } = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
    });


        // Update user access token in DB

    await prisma.user.update({
      where: { spotifyId },
      data: {
        accessToken: data.access_token,
        ...(data.refresh_token && { refreshToken: data.refresh_token }),
                // update refresh token if returned 

      },
    });

    // Send new access token to client
    res.json({ accessToken: data.access_token, expiresIn: data.expires_in });
  } catch (err) {
    console.error("Refresh token error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to refresh token" });
  }
};



