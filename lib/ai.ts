import OpenAI from 'openai'

// defaults to process.env["OPENAI_API_KEY"]
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'empty',
})

export default openai
