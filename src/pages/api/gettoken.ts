import type { NextApiRequest, NextApiResponse } from "next";

import Ably from "ably/promises";

//
// use the old pages router
// with the new app router there are strage errors on connecting to ably
// https://faqs.ably.com/40104-timestamp-not-current
//
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
};

export default handler;
