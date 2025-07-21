const express = require('express');
require("dotenv").config();
const app = express();
// middleware
const cors = require("cors");
const frontPort = process.env.FRONT_PORT
app.use(cors({
  origin: `http://localhost:${frontPort}`, // allow frontend origin
  credentials: true               // allow cookies if needed
}));

app.use(express.json()); 

// const playlistRoutes = require('../backend/routes/playlist.js');
const trackRoutes = require('../backend/routes/track.js');
const tracksOnPlaylistRoutes = require('../backend/routes/tracksOnPlaylist.js');
const userRoutes = require('../backend/routes/user.js')
const playlistRoutes = require('../backend/routes/playlist.js')

const authRoutes = require("./routes/authRoutes");
console.log("authRoutes:", authRoutes); // Add this
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT 

// app.use('/track', trackRoutes);
// app.use('/trackPlaylist', tracksOnPlaylistRoutes);


// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);
app.use("/api/tracks/" ,trackRoutes);
app.use('/user', userRoutes);
app.use('/playlist', playlistRoutes);



app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

