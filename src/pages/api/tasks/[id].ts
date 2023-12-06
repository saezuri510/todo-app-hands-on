import { prisma } from "@/lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const taskId = req.query.id;

      if (typeof taskId !== "string") {
        res.status(400).send({ error: "Invalid id" });
        return;
      }

      let completedAt = null;

      if (req.body.isCompleted) {
        completedAt = new Date();
      }

      const task = await prisma.task.update({
        where: { id: taskId },
        data: {
          completedAt,
        },
      });

      res.status(200).send(task);
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
