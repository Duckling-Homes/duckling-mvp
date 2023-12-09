import OpenAI from 'openai'

// defaults to process.env["OPENAI_API_KEY"]
const openai = new OpenAI({})

export default openai
