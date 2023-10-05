// utils/withErrorHandler.ts
import { NextRequest, NextResponse } from "next/server";
import HandlerError from "./HandlerError";

type NextEdgeHandler = (req: NextRequest) => Promise<NextResponse>;

const withErrorHandler = (handler: NextEdgeHandler) => async (req: NextRequest) => {
  try {
    return await handler(req);
  } catch (error) {
    let statusCode: number;
    let message: string;

    if (error instanceof HandlerError) {
      statusCode = error.statusCode;
      message = error.message;
    } else {
      statusCode = 500;
      message = (error as Error).message || 'An unexpected error occurred';
    }

    console.error('API Error', error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
};

export default withErrorHandler;
