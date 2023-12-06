import { BaseButton } from "@/components/ui/base/BaseButton";
import { Task } from "@/types/Task";
import { fetcher } from "@/utils/fetcher";

type Props = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: Props) => {
  const handleCheck = ({ id, completedAt }: Task) => {
    fetcher(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      body: { isCompleted: completedAt === null },
    });
  };

  // const deleteTask = (index: number) => {
  //   setTasks((prev) => prev.filter((_task, i) => i !== index));
  // };

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
            type="button"
            // onClick={() => deleteTask(idx)}
          >
            X
          </BaseButton>
        </li>
      ))}
    </ul>
  );
};
