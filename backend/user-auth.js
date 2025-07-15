//https://developer.spotify.com/documentation/web-api/tutorials/refreshing-token

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const authController = require('./Controllers/authController');



const app = express()
const clientId = process.env.SPOTIFY_CLIENT_ID
const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)
const scope = 'user-read-private user-read-email'
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`

console.log("Visit this URL to log in:", authUrl)

const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const PORT = process.env.PORT || 3001
const basicAuth = Buffer.from(`${clientId}:${client_secret}`).toString("base64");


app.get("/api/auth/login-url", (req, res) => {
  res.json({ url: authUrl });
});


app.get("/api/auth/refresh-token/:spotifyId", async (req, res) => {
  const spotifyId = req.params.spotifyId;

  try {
    const user = await prisma.user.findUnique({ where: { spotifyId } });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Make request to Spotify to get a new access token
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", user.refreshToken);


    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    // Update user access token in DB
    await prisma.user.update({
      where: { spotifyId },
      data: {
        accessToken: data.access_token,
        // update refresh token if returned 
        ...(data.refresh_token && { refreshToken: data.refresh_token }),
      },
    });

    // Send new access token to client
    res.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to refresh token" });
  }
});


app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code
  if (!code) return res.send("Missing code!")
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }
    )
    const { access_token, refresh_token } = response.data
    console.log("Access token:", access_token)
    res.redirect(`http://localhost:3000/home?access_token=${access_token}&spotify_id=${userSpotifyProfile.id}`);


    const profileResponse = await axios.get('https://api.spotify.com/v1/me',
      {
         headers: {
          'Authorization': `Bearer ${access_token}`
        },
      }
    );
    console.log("Spotify user profiel: ", profileResponse.data)

    const userSpotifyProfile = profileResponse.data;

  const user = {
   spotifyId: userSpotifyProfile.id,
    email: userSpotifyProfile.email,
    displayName: userSpotifyProfile.display_name,
    accessToken: access_token,
    refreshToken: refresh_token,
  };

  await authController.create(
    { body: user }, 
    { 
     status: (code) => ({
        json: (data) => console.log(`DB response (${code}):`, data)
      })
    } 
    );


    const refreshResponse = await axios.post(`https://accounts.spotify.com/api/token`,

      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }

    );

    const newAcessToken = refreshResponse.data.access_token; 

  } catch (err) {
    console.error("Error exchanging code for token:", err.response?.data || err.message)
    res.status(500).send("Auth failed.")
  }
})
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})