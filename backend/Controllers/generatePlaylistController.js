const {OpenAI} = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const dotenv = require("dotenv");
dotenv.config()

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const clientId = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

const axios = require("axios");

// neeed  to try this after a user has logged in
const getAccessToken = async(userId) => {
  const response = await prisma.user.findUnique({
    where: { id: userId },
    select: { accessToken: true }
  });

  if (response){
    return response.accessToken
  } else {
    return null
  }
}

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
                  Include a playlist name and a list of tracks. Each track should include a title, artist, and (optional) estimated BPM.
                Example format:
                  {
                    "tracks": [
                      { "title": "Song A", "artist": "Artist A", "bpm": 85 },
                      { "title": "Song B", "artist": "Artist B", "bpm": 90 }
                    ],
                    "duration": 100 minutes
                  }`
      },        
      {  
        role: "user", 
        content: prompt 
      }
      ],
    })

    console.log("🧠 Playlist from OpenAI:\n");
    const openAIContent = response.choices[0].message.content;
    const openAIJSON = JSON.parse(openAIContent);

    console.log("THIS IS THE JSON. response.choice[0].message.content has already been done\n", openAIJSON);
    return openAIJSON;

  } catch (err) {
    console.error("Error talking to OpenAI:", err)
    throw err;
  }
}

async function getSpotifyId(name, artist, id) {
  try {
    console.log("Searching for the track ID with this name and artist on Spotify");
    console.log("This is the name: " + name);
    console.log("This is the artist: " + artist);
    const spotifyToken = await getAccessToken(id);

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyToken
      }
    };
    const query = `track:"${name}" artist:"${artist}"`;
    const encodedQuery = encodeURIComponent(query);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`,
      headers
    );

    console.log("we have searched the spotify api, this is what we got: ")
    console.log(response);
    console.log(response.data);

    const items = response.data.tracks.items;
    if (items && items.length > 0) {
      console.log("the spotify id was found! returning it now")
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


async function createTracks(tracks, id) {
  console.log("now in the create trackss function")
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    throw new Error("The tracks are required and must be a non-empty array");
  }

  try { // doesn not account for if the track is already in db so you will need to add that
    const prismaTracks = await Promise.all(
      tracks.map(async (track) => {
        const spotifyId = await getSpotifyId(track.name, track.artist, id);
        return prisma.track.create({
          data: {
            spotifyId,
            name: track.name,
            artist: track.artist,
            bpm: track.bpm
          }
        });
      })
    );

    console.log("the tracks have been made");
    return prismaTracks;
  } catch (err) {
    console.error("Error making tracks", err);
    throw err;
  }
}

async function getSpotifyIdFromToken() {
  
}

// this is for the route : router.post("/", generatePlaylistController.createPrompt)
const createPrompt = async (req, res) => {
  console.log("Saving the created prompt to database.");

  const spotifyUserId = getSpotifyIdFromToken();
  const user = await prisma.user.findUnique({
    where: { spotifyUserId }
  });
  const userId = user.id;
    
  // these are the things we need to get the playlist
  console.log(req.body);
  const { name, activity, bpmLow, bpmHigh, genres, duration } = req.body;
  if (!name || !activity || !genres || !duration) {
    return res
      .status(400)
      .json({ error: "The name, activity, genres, and duration fields are required" });
  }

  let userContentPrompt = "";
  if ((bpmLow != 0) && (bpmHigh != 0)){
    userContentPrompt = `Create a playlist for the activity: ${activity}. 
      All songs should have a tempo between ${bpmLow} and ${bpmHigh} BPM. 
      Use the following genres: ${genres.join(", ")}. 
      The playlist should match the mood and energy of the activity.
      The name of the playlist is ${name}.

      The playlist should be approximately ${duration} minutes long. 
      Assume the average song is 3 minutes, and include about ${Math.floor(duration / 3)} songs.

      Respond in valid JSON format only.
      Structure your response like this:
      {
        "playlistName": "Name of the Playlist",
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
  } else {
    userContentPrompt = `Create a playlist for the activity: ${activity}. 
      Use the following genres: ${genres.join(", ")}. 
      The playlist should match the mood and energy of the activity.
      The name of the playlist is ${name}.

      The playlist should be approximately ${duration} minutes long. 
      Assume the average song is 3 minutes, and include about ${Math.floor(duration / 3)} songs.

      Respond in valid JSON format only.
      Structure your response like this:
      {
        "playlistName": "Name of the Playlist",
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
  }

  console.log("about to talk to OpenAIAPI");
  const openAIResponse = await callOpenAI(userContentPrompt);
  console.log("done talking to OpenAIAPI ");

  console.log("trying to get the spotify ids and make the tracks for the database, entering the createTracks function");
  const songTracks = await createTracks(openAIResponse.tracks, userId);

  try {
    const playlistInfo = await prisma.playlist.create({
      data: {
        name: playlistName,
        activity,
        bpmLow,
        bpmHigh,
        genres,
        duration,
        user: {
          connect: { id: userId }
        },
      }
    });

    console.log(playlistInfo);
    console.log("Playlist data created successfully, but there are no tracks yet");

    try {
      const trackPlaylistRelation = await Promise.all(       
        songTracks.map(async (track) => {
          return prisma.tracksOnPlaylists.create({
            data: {
              playlistId : playlistInfo.id,
              trackId : track.id
            }
          });
        })
      )
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    res.json(playlistInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}





module.exports = {
  createPrompt
};


