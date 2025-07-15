// import { OpenAI } from 'openai'
const { PrismaClient } = require("@prisma/client");
const {OpenAI} = require("openai");
const dotenv = require("dotenv");
// import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function testOpenAI() {
  try {
//     const prompt = process.argv[2] || "What genres does playboi carti fall under";
//     //prompt acts a default if you run a command in the terminal it'll run as well

// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [{ role: "user", content: prompt }],
// });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a playlist generator that outputs JSON"}, 
        {  role: "user", content: "I need a 30 minute playlist for studying.", },
      ],
    })

    console.log("🧠 Playlist from OpenAI:\n")
    console.log(response.choices[0].message.content)
  } catch (err) {
    console.error("Error talking to OpenAI:", err)
  }
}

testOpenAI()
