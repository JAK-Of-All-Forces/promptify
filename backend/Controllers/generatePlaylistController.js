import { OpenAI } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const prisma = require("../models/prismaClient");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// this is for the route : router.post("/", generatePlaylistController.createPrompt)
const createPrompt = async (req, res) => {
  console.log("Saving the created prompt to database.");
    
  // these are the things we need to get the playlist
  const { name, activity, bpmLow, bpmHigh, genres, userId } = req.body;
  if (!name || !activity || !genres || userId) {
    return res
      .status(400)
      .json({ error: "The name, activity, genres, and userID fields are required" });
  }

  if (bpmLow && bpmHigh){
    const sendingPayload = `Create a playlist for the activity: ${activity}. 
      All songs should have a tempo between ${bpmLow} and ${bpmHigh} BPM. 
      Use the following genres: ${genres.join(", ")}. 
      The playlist should match the mood and energy of the activity.

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
      const sendingPayload = `Create a playlist for the activity: ${activity}. 
          Use the following genres: ${genres.join(", ")}. 
          The playlist should match the mood and energy of the activity.

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
  

  try {
    const playlistInfo = await prisma.order.create({
      data: {
        name,
        activity,
        bpmLow,
        bpmHigh,
        genres,
        userId
      },
    });

    console.log(playlistInfo);
    console.log("Playlist data created successfully");
    res.json(playlistInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


async function callOpenAI() {
  try {

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
                    "playlistName": "Chill Vibes for a Rainy Day",
                    "tracks": [
                      { "title": "Song A", "artist": "Artist A", "bpm": 85 },
                      { "title": "Song B", "artist": "Artist B", "bpm": 90 }
                    ]
                  }`
      },        
      {  
        role: "user", 
        content: "I need a 30 minute playlist for studying.", 
      }
      ],
    })

    console.log("🧠 Playlist from OpenAI:\n");
    const openAIJSON = response.choices[0].message.content;
    console.log(openAIJSON);
  } catch (err) {
    console.error("Error talking to OpenAI:", err)
  }
}
callOpenAI()



module.exports = {
  createOrder,
  getOrderbyId,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addItemToOrder,
  calculateTotal,
  getOrderItems,
};


