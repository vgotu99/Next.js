import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
};

export default handler;
