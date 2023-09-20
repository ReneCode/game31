import { NextResponse } from "next/server";

import Ably from "ably/promises";

export async function GET(request: Request) {
  const CLIENT_ID =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // const CLIENT_ID = process.env.ABLY_CLIENT_ID || "";
  const API_KEY = process.env.ABLY_API_KEY || "";

  const client = new Ably.Realtime(API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: CLIENT_ID,
  });
  return NextResponse.json(tokenRequestData);
}
