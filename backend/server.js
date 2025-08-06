const express = require('express');
require("dotenv").config();
const app = express();

// middleware
const cors = require("cors");
const CLIENT_URL = process.env.CLIENT_URL

app.use(cors({
  origin: `${CLIENT_URL}`, // allow frontend origin
  credentials: true               // allow cookies if needed
}));

app.use(express.json()); 

const trackRoutes = require('../backend/routes/track.js');
const tracksOnPlaylistRoutes = require('../backend/routes/tracksOnPlaylist.js');
const userRoutes = require('../backend/routes/user.js')
const playlistRoutes = require('../backend/routes/playlist.js')

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT 


app.use('/assets', express.static('public/assets'));  // serve static assets

app.use("/api/tracks/" ,trackRoutes);
app.use('/user', userRoutes);
app.use('/playlist', playlistRoutes);
app.use("/tracksOnPlaylists", tracksOnPlaylistRoutes)



app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

