import { Task } from "@/types/Task";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps } from "next";

export type Props = {
  tasks: Task[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  _context,
) => {
  const res = await fetcher("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return { props: { tasks } };
};
