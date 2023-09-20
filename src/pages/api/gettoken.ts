import type { NextApiRequest, NextApiResponse } from "next";

import Ably from "ably/promises";

type ResponseData = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const CLIENT_ID = process.env.ABLY_CLIENT_ID || "";
  const API_KEY = process.env.ABLY_API_KEY || "";

  const clientId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const client = new Ably.Realtime(API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId,
  });

  res.status(200).json(tokenRequestData);

  // return NextResponse.json(tokenRequestData);
};

export default handler;
