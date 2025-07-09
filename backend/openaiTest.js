import { OpenAI } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Make a 20-minute upbeat playlist for walking to class. List 8 songs with artist names only.",
        },
      ],
    })

    console.log("🧠 Playlist from OpenAI:\n")
    console.log(response.choices[0].message.content)
  } catch (err) {
    console.error("Error talking to OpenAI:", err)
  }
}

testOpenAI()
