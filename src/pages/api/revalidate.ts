import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await res.revalidate("/"); // "http://localhost:3000/api/revalidate"로 요청이 오면 revalidate method의 인수에 들어있는 경로의 페이지를 ISR 방식으로 새로운 정적 페이지로 재생성한다.(On-demand ISR)

    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed");
  }
};

export default handler;
