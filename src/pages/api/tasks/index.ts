import { prisma } from "@/lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const tasks = await prisma.task.findMany();

      res.status(200).send(tasks);
    } else {
      res.status(405).send({ error: "Method not allowed" });
    }
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).send({ error: `${e.message}` });
    } else {
      return res.status(500).send({ error: `${String(e)}` });
    }
  }
};

export default handler;
