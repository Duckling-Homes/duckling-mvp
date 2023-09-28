import { NextApiResponse } from "next";

export function apiErrorHandler(err: Error, res: NextApiResponse) {
  console.error(err); // Log the error for debugging - update with better logging
  
  // Update this function as needed to support more robust error handling
  res.status(500).json({ error: 'Internal Server Error' });
}
