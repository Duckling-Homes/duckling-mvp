// utils/withErrorHandler.ts
import { NextRequest, NextResponse } from 'next/server'
import HandlerError from './HandlerError'

type NextEdgeHandler = (req: NextRequest) => Promise<NextResponse>
type NextEdgeHandlerParams = (
  req: NextRequest,
  { params }: { params: any }
) => Promise<NextResponse>

const withErrorHandler =
  (handler: NextEdgeHandler | NextEdgeHandlerParams) =>
  async (req: NextRequest, params?: { params: any }) => {
    try {
      if (handler.length === 1) {
        return await (handler as NextEdgeHandler)(req)
      } else {
        return await (handler as NextEdgeHandlerParams)(req, params!)
      }
    } catch (error) {
      let statusCode: number
      let message: string

      if (error instanceof HandlerError) {
        statusCode = error.statusCode
        message = error.message
      } else {
        statusCode = 500
        message = (error as Error).message || 'An unexpected error occurred'
      }

      console.error('API Error', error)
      return NextResponse.json({ error: message }, { status: statusCode })
    }
  }

export default withErrorHandler
