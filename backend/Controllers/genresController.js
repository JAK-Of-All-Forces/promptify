const fs = require('fs/promises');
const path = require('path');

const getGenres = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'genres.json'); 
    const data = await fs.readFile(filePath, 'utf8');
    const genres = JSON.parse(data);

    // Extract only the 'name' from each genre object
    const genreNames = genres.map(genre => genre.name);

    res.status(200).json({ genres: genreNames });
  } catch (error) {
    console.error("Error reading genres file:", error);
    res.status(500).json({ error: "Failed to load genres." });
  }
};

module.exports = {
  getGenres,
};