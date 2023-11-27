import { getProjectObject } from '@/app/utils/ai'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    return NextResponse.json(getProjectObject(params.id))
  }
)
