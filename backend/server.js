const express = require('express');
require("dotenv").config();
const app = express();

// const playlistRoutes = require('../backend/routes/playlist.js');
const trackRoutes = require('../backend/routes/track.js');
const tracksOnPlaylistRoutes = require('../backend/routes/tracksOnPlaylist.js');
const userRoutes = require('../backend/routes/user.js')

const authRoutes = require("./routes/authRoutes");
console.log("authRoutes:", authRoutes); // Add this
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3001

// middleware
const cors = require("cors");
app.use(cors());
app.use(express.json()); 

// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);
app.use("/api/tracks/" ,trackRoutes);


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// app.use('/playlist', playlistRoutes);
// app.use('/track', trackRoutes);
// app.use('/trackPlaylist', tracksOnPlaylistRoutes);
// app.use('user', userRoutes);