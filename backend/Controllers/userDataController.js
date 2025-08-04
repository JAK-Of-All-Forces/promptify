const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

async function getTrackImageURL(userId, spotifyIds) {
try {
    const spotifyToken = await getAccessToken(userId);
    if (!spotifyToken) {
      console.log("No valid access token found");
      return {};
    }
    console.log("These are the spotify IDs: ", spotifyIds);

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };

    // Spotify allows max 50 IDs per request
    const MAX_BATCH_SIZE = 50;
    const imageMap = {};
    // await delay(30000); // 30 second delay

    for (let i = 0; i < spotifyIds.length; i += MAX_BATCH_SIZE) {
      const batchIds = spotifyIds.slice(i, i + MAX_BATCH_SIZE).join(",");
      console.log("These are the batch IDs: ", batchIds);
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${batchIds}`,
        { headers }
      );

      if (response && response.data && response.data.tracks) {
        response.data.tracks.forEach(track => {
          if (
            track &&
            track.album &&
            Array.isArray(track.album.images) &&
            track.album.images.length > 0
          ) {
            imageMap[track.id] = track.album.images[0].url;
            console.log(`Image URL for track ${track.id}: ${imageMap[track.id]}`);
          } else {
            const fallbackImageUrl = 'http://localhost:3001/assets/no-img.png';
            imageMap[track.id] = fallbackImageUrl; // Fallback image if no album image is available
          }
        });
      }
    }

    return imageMap; // { trackId1: imageUrl1, trackId2: imageUrl2, ... }
  } catch (error) {
      console.error("Error fetching track images batch:", error.response?.data || error.message);
    return {};
  }
}

// get top tracks (4 weeks), limit = 30 - return the album, artists, spotify id, track name
const topTracks4 = async (userId) => {
  try {
            // await delay(30000); // 30 second delay

    // console.log("grabbing the top tracks for this user...");
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

    // console.log("about to get short term top tracks");
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
    const spotifyIds = [];
    for (let i = 0; i < topTracks.length; i++) {
      spotifyIds.push(topTracks[i].id);
    }
    const imagesMap = await getTrackImageURL(userId, spotifyIds);
    

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
      const image = imagesMap[currTrack.id];
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
          // await delay(30000); // 30 second delay

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
    console.log("got the medium term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];
    const spotifyIds = [];
    for (let i = 0; i < topTracks.length; i++) {
      spotifyIds.push(topTracks[i].id);
    }
    const imagesMap = await getTrackImageURL(userId, spotifyIds);
    

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
      const image = imagesMap[currTrack.id];
      const artists = currTrack.artists.map((artist) => artist.name).join(", "); // .join makes it a string

      simplifiedTracks.push({
        trackName,
        spotifyId,
        albumName,
        image,
        artists,
      });
    }

    return simplifiedTracks;
  } catch (error) {
    console.error(
      "Error in topTracks6:",
      error.response?.data || error.message || error
    );
  }
};

// get top tracks (one year), limit = 30 - return the album, artists, spotify id, track name
const topTracks1 = async (userId) => {
          // await delay(30000); // 30 second delay

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
    console.log("got the long term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];
    const spotifyIds = [];
    for (let i = 0; i < topTracks.length; i++) {
      spotifyIds.push(topTracks[i].id);
    }
    const imagesMap = await getTrackImageURL(userId, spotifyIds);
    

    for (let i = 0; i < topTracks.length; i++) {
      const currTrack = topTracks[i];

      const trackName = currTrack.name;
      const spotifyId = currTrack.id;
      const albumName = currTrack.album.name;
      const image = imagesMap[currTrack.id];
      const artists = currTrack.artists.map((artist) => artist.name).join(", "); // .join makes it a string

      simplifiedTracks.push({
        trackName,
        spotifyId,
        albumName,
        image,
        artists,
      });
    }
    return simplifiedTracks;
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
        // await delay(30000); // 30 second delay
    console.log("grabbing the short term top albums for this user...");
    const shortTermTrackData = await topTracks4(userId);
    console.log(shortTermTrackData);

    // loop through track data, create a map. place the album name with corresponding tracks
    const albumMap = {};
    for (let track of shortTermTrackData) {
        // console.log("SCEEBADKJBFM JLKBALSGE");
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



    // console.log("THIS IS TOP ALBUMS USERDATA CONTROLLER")
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
          // await delay(30000); // 30 second delay

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
          // await delay(30000); // 30 second delay

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

const initUserStats = async (userId) => {
  const topTracks = {
    short: await topTracks4(userId),
    medium: await topTracks6(userId),
    long: await topTracks1(userId),
  };

  const topAlbums = {
    short: await topAlbums4(userId),
    medium: await topAlbums6(userId),
    long: await topAlbums1(userId),
  };

  const topArtists = {
    short: await topArtists4(userId),
    medium: await topArtists6(userId),
    long: await topArtists1(userId),
  };

  const topGenres = {
    short: await topGenres4(userId),
    medium: await topGenres6(userId),
    long: await topGenres1(userId),
  };

  const stats = await prisma.userStats.upsert({
    where: { userId },
    update: { topTracks, topAlbums, topArtists, topGenres },
    create: { userId, topTracks, topAlbums, topArtists, topGenres },
  });

  return stats;
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
  initUserStats
};
