import axios from 'axios'
//axios makes http request to the spotify api
import dotenv from 'dotenv'
dotenv.config()
//.env just makes sure that we can use the spotify credentials
//in order to access any data  a token is needed aka the user needs to be logged in to access their data
//to run call node spotifyAuthTest.js
import express from 'express'
const app = express()
const clientId = process.env.SPOTIFY_CLIENT_ID
//client ID is our application
const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)
//redirect URI says who are we sending the token back to?
const scope = 'user-read-private user-read-email'
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`
//the actual link
console.log("Visit this URL to log in:", authUrl)
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const PORT = process.env.PORT || 3001
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
          'Authorization': 'Basic ' + Buffer.from(`${clientId}:${client_secret}`).toString('base64')
        }
      }
    )
    const { access_token, refresh_token, expires_in } = response.data
    console.log("Access token:", access_token)
    res.send("Login successful! You can close this tab.")
  } catch (err) {
    console.error("Error exchanging code for token:", err.response?.data || err.message)
    res.status(500).send("Auth failed.")
  }
})
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})