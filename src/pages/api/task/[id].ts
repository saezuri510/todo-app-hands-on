import { prisma } from "@/lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const taskId = req.query.id;

    if (typeof taskId !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    switch (req.method) {
      case "PUT":
        let completedAt = null;

        if (req.body.isCompleted) {
          completedAt = new Date();
        }

        const updatedTask = await prisma.task.update({
          where: { id: taskId },
          data: {
            completedAt,
          },
        });

        res.status(200).send(updatedTask);
        break;
      case "DELETE":
        const deletedTask = await prisma.task.delete({
          where: { id: taskId },
        });

        res.status(200).send(deletedTask);
        break;
      default:
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
