import openai from '@/lib/ai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const input = await req.json()
  const messages = input

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    response_format: {
      type: 'json_object',
    },
    stream: true,
    messages: messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
