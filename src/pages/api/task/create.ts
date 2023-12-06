import { prisma } from "@/lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const name = req.body.name;

      if (name) {
        const task = await prisma.task.create({
          data: {
            name,
          },
        });

        res.status(200).send(task);
      } else {
        res.status(400).send({ error: "Task name not specified" });
      }
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
