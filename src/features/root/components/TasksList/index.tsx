import { BaseButton } from "@/components/ui/base/BaseButton";
import { Task } from "@/types/Task";
import { fetcher } from "@/utils/fetcher";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TasksList = ({ tasks, setTasks }: Props) => {
  const handleCheck = async ({ id, completedAt }: Task) => {
    const updatedTask: Task = await fetcher(
      `http://localhost:3000/api/task/${id}`,
      {
        method: "PUT",
        body: { isCompleted: completedAt === null },
      },
    );

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = async ({ id }: Task) => {
    const deletedTask: Task = await fetcher(
      `http://localhost:3000/api/task/${id}`,
      {
        method: "DELETE",
      },
    );

    setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
  };

  return (
    <ul className="space-y-[8px] p-[16px]">
      {tasks.map((task) => (
        <li key={task.id} className="flex w-full items-center">
          <input
            className="mr-[16px] h-[18px] w-[18px] outline-none"
            type="checkbox"
            id={`checkbox-${task.id}`}
            checked={task.completedAt !== null}
            onChange={() => handleCheck(task)}
          />
          <label htmlFor={`checkbox-${task.id}`}>{task.name}</label>
          <BaseButton
            className="ml-auto h-[24px] w-[24px] rounded-full bg-white text-[10px]"
            onClick={() => deleteTask(task)}
          >
            X
          </BaseButton>
        </li>
      ))}
    </ul>
  );
};
