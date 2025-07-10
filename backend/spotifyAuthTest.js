import axios from 'axios'
//axios makes http request to the spotify api 
import dotenv from 'dotenv'
dotenv.config()
//.env just makes sure that we can use the spotify credentials 

//in order to access any data  a token is needed aka the user needs to be logged in to access their data

//to run call node spotifyAuthTest.js


const clientId = process.env.SPOTIFY_CLIENT_ID
//client ID is our application 
const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)
//redirect URI says who are we sending the token back to? 
const scope = 'user-read-private user-read-email'

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`
//the actual link 

console.log("Visit this URL to log in:", authUrl)


