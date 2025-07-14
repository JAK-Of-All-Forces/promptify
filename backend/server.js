import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const playlistRoutes = require('../backend/routes/playlist.js');
const trackRoutes = require('../backend/routes/track.js');
const tracksOnPlaylistRoutes = require('../backend/routes/tracksOnPlaylist.js');
const userRoutes = require('../backend/routes/user.js')

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use('/playlist', playlistRoutes);
app.use('/track', trackRoutes);
app.use('/trackPlaylist', tracksOnPlaylistRoutes);
app.use('user', userRoutes);