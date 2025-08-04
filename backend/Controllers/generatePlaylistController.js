const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const dotenv = require("dotenv");
dotenv.config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");


const seedUserMusicHistory = async (userId) => {
  try {
    // Fetch user stats once from DB
    const stats = await prisma.userStats.findUnique({
      where: { userId },
      select: {
        topTracks: true,
        topAlbums: true,
        topArtists: true,
        topGenres: true,
      },
    });

    if (!stats) {
      throw new Error("User stats not found");
    }

    const topTracks4Weeks = stats.topTracks?.short || [];
    const topAlbums4Weeks = stats.topAlbums?.short || [];
    const topArtist4Weeks = stats.topArtists?.short || [];
    const topGenres4Weeks = stats.topGenres?.short || [];

    let trackswithArtist = ""
    for (let track of topTracks4Weeks){
      trackswithArtist += `${track.trackName} by ${track.artists}, `
    }

    let albumswithArtist = ""
    for (let album of topAlbums4Weeks) {
      const albumName = album[0];
      const firstArtist = album[1][0]?.artists || "Unknown Artist"; // get first artist of first track, safely
      albumswithArtist += `${albumName} by ${firstArtist}, `;
    }
    console.log(albumswithArtist);
    console.log("\n")

    let seedArtist = ""
    for (let artist of topArtist4Weeks){
      seedArtist += `${artist.artistName}, `
    }
    console.log(seedArtist)
    console.log("\n")

    let seedGenres = ""
    for (let genre of topGenres4Weeks){
      seedGenres += `${genre[0]}, `
    }
    console.log(seedGenres)
    console.log("\n")

    const seededData = `
    The user's recent listening history includes these top tracks: ${trackswithArtist}.
    Top albums: ${albumswithArtist}.
    Top artists: ${seedArtist}.
    Top genres: ${seedGenres}.

    Use this information to build a profile of the user's music taste. 
    For requests involving genres similar to these, prioritize recommendations that fit their current preferences. 
    For other requests, use this profile to understand their overall style and tailor the playlist accordingly.
    `

    return seededData;
  } catch (error) {
    console.error("Error in seedUserMusicHistory:", error);
    throw error;
  }
};

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

async function callOpenAI(prompt) {
  try {
    console.log("Inside the OpenAI call");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI playlist generator. Your job is to generate a playlist based on the user's activity, genre, duration, and target BPM range. 
                  You always respond in clean, valid JSON format only — no explanations or extra text. 
                  Include a playlist name and a list of tracks. Each track should include a title, artist, and estimated BPM.
                  Only include songs that are available on Spotify. Do not include made-up or fictional tracks. 
                  All recommendations must be based on real, verifiable songs that exist in Spotify’s public catalog.
                  Only recommend real songs that are **definitely available on Spotify** — if you're unsure, do not include them. Avoid fictional, obscure, or AI-invented tracks. 


                Example format:
                  {
                    "tracks": [
                      { "title": "Song A", "artist": "Artist A", "bpm": 85 },
                      { "title": "Song B", "artist": "Artist B", "bpm": 90 }
                    ],
                    "duration": 100 minutes
                  }`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const openAIContent = response.choices[0].message.content;
    const openAIJSON = JSON.parse(openAIContent);

    console.log("🧠 Playlist from OpenAI:\n");
    console.log(openAIJSON);
    return openAIJSON;
  } catch (err) {
    console.error("Error talking to OpenAI:", err);
    throw err;
  }
}

async function getSpotifyId(name, artist, userId) {
  try {
    console.log(
      "Searching for the track ID with this name and artist on Spotify"
    );
    console.log("This is the name: " + name);
    console.log("This is the artist: " + artist);
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken) {
      console.log(`Looking up Spotify ID for ${name} by ${artist}`);
    } else {
      console.log("there is no valid token");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    };
    artist = artist.split(/ft\.|feat\.|featuring/i)[0].trim();
    const query = `track:"${name}" artist:"${artist}"`;
    const encodedQuery = encodeURIComponent(query);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`,
      { headers }
    );

    // console.log("we have searched the spotify api, this is what we got: ")
    // console.log(response);
    // console.log(response.data);

    const items = response.data.tracks.items;
    if (items && items.length > 0) {
      console.log("the spotify id was found! returning it now");
      return items[0].id; // Spotify ID
    } else {
      console.log("The Spotify ID for this track was not found in Spotify.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Spotify ID:", error);
    return null;
  }
}

async function createTracks(tracks, userId) {
  console.log("now in the createTracks function");
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    throw new Error("The tracks are required and must be a non-empty array");
  }

  try {
    const prismaTracks = await Promise.all(
      tracks.map(async (track) => {
        const spotifyID = await getSpotifyId(track.name, track.artist, userId);
        console.log(
          `Track: ${track.name}, Artist: ${track.artist}, Spotify ID: ${spotifyID}`
        );

        if (!spotifyID) {
          console.warn(
            `Skipping track: ${track.name} by ${track.artist} — No Spotify ID found`
          );
          return null;
        }

        const imageURL = await getTrackImageURL(userId, spotifyID);
        const trackDuration = await getTrackDuration(userId, spotifyID);

        const existingTrack = await prisma.track.upsert({
          where: { spotifyId: spotifyID },
          update: {}, // No update needed; just return existing
          create: {
            spotifyId: spotifyID,
            name: track.name,
            artist: track.artist,
            duration: trackDuration,
            image_url: imageURL,
          },
        });

        console.log("leaving create tracks!");
        return existingTrack;
      })
    );
    // Remove any nulls from skipped tracks
    return prismaTracks.filter(Boolean);
  } catch (err) {
    console.error("Error making tracks", err);
    throw err;
  }
}

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

async function getTrackDuration(userId, spotifyId) {
  try {
    console.log("Inside getTrackDuration");

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

    if (response && response.data && response.data.duration_ms) {
      const durationMs = response.data.duration_ms;
      console.log(`fetched duration in ms: ${durationMs}`);

      // regular duration as string
      let minutes = Number((durationMs / 1000 / 60).toFixed(0));
      let seconds = Number(((durationMs / 1000) % 60).toFixed(0));
      let regularDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      console.log(`calculated duration is: ${regularDuration} `);

      return regularDuration;
    } else {
      console.log("no duration found for this track");
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

// this is for the route : router.post("/", generatePlaylistController.createPrompt)
const createPrompt = async (req, res) => {
  console.log("Saving the created prompt to database.");

  // these are the things we need to get the playlist
  console.log(req.body);
  const { name, activity, genres, duration, spotifyId } = req.body;
  if (!name || !activity || !genres || !duration || !spotifyId) {
    return res.status(400).json({
      error:
        "The name, activity, genres, duration, and SpotifyId fields are required",
    });
  }

  // get spotifyID
  const user = await prisma.user.findUnique({
    where: { spotifyId },
  });
  const userId = user.id;
  
  const extraData = await seedUserMusicHistory(userId);
  let userContentPrompt = extraData;

  userContentPrompt += `Create a playlist for the activity: ${activity}. 
  Use the following genres: ${genres.join(", ")}. 
  The playlist should match the mood and energy of the activity.
  The name of the playlist is ${name}.

  The playlist must be at least ${duration} minutes long.
  Assume the average song length is ~3 minutes.
  Include exactly ${Math.ceil(duration / 3)} songs.

  Follow these rules strictly:
  1. Match the energy/mood of the activity.
  2. Stick to the listed genres.
  3. Include exactly ${Math.ceil(duration / 3)} songs.
  4. Each song should be roughly 3 minutes.
  5. Ensure the total duration is at least ${duration} minutes.
  6. Respond in **valid JSON format only**.

  Structure your response like this:
  {
    "playlistName": "Name of the Playlist",
    "estimatedDuration": totalDurationInMinutes,
    "tracks": [
      {
        "spotifyId": "Spotify Track ID",
        "name": "Song Title",
        "artist": "Artist Name",
        "bpm": BPM
      },
      ...
    ]
  }`;


  console.log("about to talk to OpenAIAPI");
  const openAIResponse = await callOpenAI(userContentPrompt);
  console.log("done talking to OpenAIAPI ");

  console.log(
    "trying to get the spotify ids and make the tracks for the database, entering the createTracks function"
  );

  console.log("here are the songTracks:");
  const songTracks = await createTracks(openAIResponse.tracks, userId);
  console.log("made it back to createPrompt from createTracks");
  console.log("these are the songtracks");
  console.log(songTracks);

  let playlistImageUrl;
  console.log("setting playlist image url");
  if (songTracks.length > 0 && songTracks[0].image_url) {
    playlistImageUrl = songTracks[0].image_url;
  } else {
    playlistImageUrl = "backend/assets/no_img.png";
  }

  try {
    // Create the playlist first
    const playlistInfo = await prisma.playlist.create({
      data: {
        name,
        activity,
        genres,
        duration,
        user: {
          connect: { id: userId },
        },
        image_url: playlistImageUrl,
      },
    });

    console.log(
      "Playlist data created successfully, but there are no tracks yet"
    );

    // Create relations between tracks and the playlist
    await Promise.all(
      songTracks.map(async (track) => {
        if (!track.id) {
          console.warn(
            `Skipping track with missing id: ${JSON.stringify(track)}`
          );
          return null; // Skip this track to avoid error
        }
        return prisma.tracksOnPlaylists.create({
          data: {
            playlistId: playlistInfo.id,
            trackId: track.id,
          },
        });
      })
    );
    console.log("Relation between track and playlist has been made");

    res.json(playlistInfo);
  } catch (error) {
    console.error("Error creating playlist or relations:", error);
    res.status(500).json({ error: error.message });
  }

  console.log("all done!");
};

module.exports = {
  createPrompt,
};
