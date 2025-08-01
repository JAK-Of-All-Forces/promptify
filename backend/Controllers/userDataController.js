const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const getAccessToken = async (userId) => {
  const response = await prisma.user.findUnique({
    where: { id: userId },
    select: { accessToken: true },
  });

  if (response) {
    console.log("we got the accesss token");
    return response.accessToken;
  } else {
    return null;
  }
};

async function getTrackImageURL(userId, spotifyId) {
  try {
    console.log("Inside getTrackImageURL");

    const spotifyToken = await getAccessToken(userId);
    if (!spotifyToken) {
      console.log("no valid access token found");
      return null;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${spotifyId}`,
      { headers }
    );

    if (
      response &&
      response.data &&
      response.data.album &&
      Array.isArray(response.data.album.images) &&
      response.data.album.images.length > 0
    ) {
      const imageUrl = response.data.album.images[0].url;
      console.log(`fetched track image URL: ${imageUrl}`);
      return imageUrl;
    } else {
      console.log("no album images found for this track");
      return null;
    }
  } catch (error) {
    console.error(
      "error fetching track image URL from Spotify:",
      error.response?.data || error.message
    );
    return null;
  }
}

// get top tracks (4 weeks), limit = 30 - return the album, artists, spotify id, track name
const topTracks4 = async (userId) => {
  try {
    console.log("grabbing the top tracks for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up tracks...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get short term top tracks");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks`,
      {
        headers,
        params: {
          limit: 30,
          time_range: "short_term",
        },
      }
    );
    console.log("got the short term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
      const image = await getTrackImageURL(userId, spotifyId);
      const artists = currTrack.artists.map((artist) => artist.name).join(", "); // .join makes it a string

      simplifiedTracks.push({
        trackName,
        spotifyId,
        albumName,
        image,
        artists,
      });
    }
    // console.log(simplifiedTracks);

    return simplifiedTracks;
  } catch (error) {
    console.error(
      "Error in topTracks4:",
      error.response?.data || error.message || error
    );
  }
};

// get top tracks (6 months), limit = 30 - return the album, artists, spotify id, track name
const topTracks6 = async (userId) => {
  try {
    console.log("grabbing the top tracks for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up tracks...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get short term top tracks");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks`,
      {
        headers,
        params: {
          limit: 30,
          time_range: "medium_term",
        },
      }
    );
    console.log("got the short term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
    const image = await getTrackImageURL(userId, spotifyId);  
      const artists = currTrack.artists.map((artist) => artist.name).join(", "); // .join makes it a string

      simplifiedTracks.push({
        trackName,
        spotifyId,
        albumName,
        image,
        artists,
      });

    }
    console.log(simplifiedTracks);
  } catch (error) {
    console.error(
      "Error in topTracks6:",
      error.response?.data || error.message || error
    );
  }
};

// get top tracks (one year), limit = 30 - return the album, artists, spotify id, track name
const topTracks1 = async (userId) => {
  try {
    console.log("grabbing the top tracks for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up tracks...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get short term top tracks");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks`,
      {
        headers,
        params: {
          limit: 30,
          time_range: "long_term",
        },
      }
    );
    console.log("got the short term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
        const image = await getTrackImageURL(userId, spotifyId);
      const artists = currTrack.artists.map((artist) => artist.name).join(", "); // .join makes it a string

      simplifiedTracks.push({
        trackName,
        spotifyId,
        albumName,
        image, 
        artists,
      });

    }
    console.log(simplifiedTracks);
  } catch (error) {
    console.error(
      "Error in topTracks1:",
      error.response?.data || error.message || error
    );
  }
};

// get top albums (4 weeks), top 10
const topAlbums4 = async (userId) => {
  try {
    console.log("grabbing the top albums for this user...");
    const shortTermTrackData = await topTracks4(userId);
    console.log(shortTermTrackData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const albumMap = {};
    for (let track of shortTermTrackData) {
        console.log("SCEEBADKJBFM JLKBALSGE");
        console.log(track.image)
        if (!albumMap[track.albumName]) {
            albumMap[track.albumName] = [];
        }
        // Push an object with trackName and artists (assuming track.artists is a string or array)
        albumMap[track.albumName].push({
            trackName: track.trackName,
            artists: track.artists, // adjust based on how artist info is stored (string or array)
            image: track.image
        });

    }

    const topAlbums = Object.entries(albumMap)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);



    console.log("THIS IS TOP ALBUMS USERDATA CONTROLLER")
    // console.log(topAlbums[0].image);

    return topAlbums;
  } catch (error) {
    console.error(
      "Error in topAlbums4:",
      error.response?.data || error.message || error
    );
  }
};

// get top albums (6 months), top 10
const topAlbums6 = async (userId) => {
  try {
    console.log("grabbing the top albums for this user...");
    const mediumTermTrackData = await topTracks6(userId);
    console.log(mediumTermTrackData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const albumMap = {};
    for (let track of mediumTermTrackData) {
        if (!albumMap[track.albumName]) {
            albumMap[track.albumName] = [];
        }
        // Push an object with trackName and artists (assuming track.artists is a string or array)
        albumMap[track.albumName].push({
            trackName: track.trackName,
            artists: track.artists, // adjust based on how artist info is stored (string or array)
            image: track.image
        });
    }

    const topAlbums = Object.entries(albumMap)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);

    console.log(topAlbums);

    return topAlbums;
  } catch (error) {
    console.error(
      "Error in topAlbums6:",
      error.response?.data || error.message || error
    );
  }
};

// get top albums (one year), top 10
const topAlbums1 = async (userId) => {
  try {
    console.log("grabbing the top albums for this user...");
    const longTermTrackData = await topTracks1(userId);
    console.log(longTermTrackData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const albumMap = {};
    for (let track of longTermTrackData) {
        if (!albumMap[track.albumName]) {
            albumMap[track.albumName] = [];
        }
        // Push an object with trackName and artists (assuming track.artists is a string or array)
        albumMap[track.albumName].push({
            trackName: track.trackName,
            artists: track.artists, // adjust based on how artist info is stored (string or array)
            image: track.image
        });
    }

    const topAlbums = Object.entries(albumMap)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);

    console.log(topAlbums);

    return topAlbums;
  } catch (error) {
    console.error(
      "Error in topAlbums1:",
      error.response?.data || error.message || error
    );
  }
};

// get top artists (4 weeks), limit = 15 - return the genres, artist name, spotify id
const topArtists4 = async (userId) => {
  try {
    console.log("grabbing the top artists for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up artists...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get short term top artist");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      {
        headers,
        params: {
          limit: 15,
          time_range: "short_term",
        },
      }
    );
    console.log("got the short term top artists");

    const topArtists = response.data.items;
    const simplifiedArtists = [];

    for (let i = 0; i < topArtists.length; i++) {
      const currArtist = topArtists[i];

      const spotifyId = currArtist.id;
      const artistName = currArtist.name;
      const genres = currArtist.genres;
      const images = currArtist.images[0].url;

      simplifiedArtists.push({
        spotifyId,
        artistName,
        genres,
        images
      });
    }

    return simplifiedArtists;
  } catch (error) {
    console.error(
      "Error in topArtists4:",
      error.response?.data || error.message || error
    );
  }
};

// get top artists (6 months), limit = 15 - return the genres, artist name, spotify id
const topArtists6 = async (userId) => {
  try {
    console.log("grabbing the top artists for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up artists...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get short term top artist");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      {
        headers,
        params: {
          limit: 15,
          time_range: "medium_term",
        },
      }
    );
    console.log("got the medium term top artists");

    const topArtists = response.data.items;
    const simplifiedArtists = [];

    for (let i = 0; i < topArtists.length; i++) {
        const currArtist = topArtists[i];

        const spotifyId = currArtist.id;
        const artistName = currArtist.name;
        const genres = currArtist.genres;
        const images = currArtist.images;       

        simplifiedArtists.push({
            spotifyId,
            artistName,
            genres,
            images
        });
    }

    return simplifiedArtists;
  } catch (error) {
    console.error(
      "Error in topArtists6:",
      error.response?.data || error.message || error
    );
  }
};

// get top artists (one year), limit = 15 - return the genres, artist name, spotify id
const topArtists1 = async (userId) => {
  try {
    console.log("grabbing the top artists for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`looking up artists...`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    console.log("about to get long term top artist");
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      {
        headers,
        params: {
          limit: 15,
          time_range: "long_term",
        },
      }
    );
    console.log("got the long term top artists");

    const topArtists = response.data.items;
    const simplifiedArtists = [];

    for (let i = 0; i < topArtists.length; i++) {
      const currArtist = topArtists[i];

      const spotifyId = currArtist.id;
      const artistName = currArtist.name;
      const genres = currArtist.genres;
        const images = currArtist.images;

      simplifiedArtists.push({
        spotifyId,
        artistName,
        genres,
        images
      });
    }

    return simplifiedArtists;
  } catch (error) {
    console.error(
      "Error in topArtists1:",
      error.response?.data || error.message || error
    );
  }
};

// get dominant genres (4 weeks), top 10
const topGenres4 = async (userId) => {
  try {
    console.log("grabbing the top genres for this user...");
    const shortTermArtistData = await topArtists4(userId);
    console.log(shortTermArtistData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const genreMap = {};
    for (let artist of shortTermArtistData) {
      for (let genre of artist.genres) {
        if (!genreMap[genre]) {
          genreMap[genre] = 0;
        }
        genreMap[genre] += 1;
      }
    }

    const topGenres = Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    console.log(topGenres);

    return topGenres;
  } catch (error) {
    console.error(
      "Error in topGenres4:",
      error.response?.data || error.message || error
    );
  }
};

// get dominant genres (6 months), top 10
const topGenres6 = async (userId) => {
  try {
    console.log("grabbing the top genres for this user...");
    const mediumTermArtistData = await topArtists6(userId);
    console.log(mediumTermArtistData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const genreMap = {};
    for (let artist of mediumTermArtistData) {
      for (let genre of artist.genres) {
        if (!genreMap[genre]) {
          genreMap[genre] = 0;
        }
        genreMap[genre] += 1;
      }
    }

    const topGenres = Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    console.log(topGenres);

    return topGenres;
  } catch (error) {
    console.error(
      "Error in topGenres6:",
      error.response?.data || error.message || error
    );
  }
};

// get dominant genres (one year), top 10
const topGenres1 = async (userId) => {
  try {
    console.log("grabbing the top genres for this user...");
    const longTermArtistData = await topArtists1(userId);
    console.log(longTermArtistData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const genreMap = {};
    for (let artist of longTermArtistData) {
      for (let genre of artist.genres) {
        if (!genreMap[genre]) {
          genreMap[genre] = 0;
        }
        genreMap[genre] += 1;
      }
    }

    const topGenres = Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    console.log(topGenres);

    return topGenres;
  } catch (error) {
    console.error(
      "Error in topGenres1:",
      error.response?.data || error.message || error
    );
  }
};


module.exports = {
  topTracks4,
  topTracks6,
  topTracks1,
  topAlbums4,
  topAlbums6,
  topAlbums1,
  topArtists4,
  topArtists6,
  topArtists1,
  topGenres4,
  topGenres6,
  topGenres1,
};
