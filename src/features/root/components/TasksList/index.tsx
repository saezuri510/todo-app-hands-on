"use client";

import { BaseButton } from "@/components/ui/base/BaseButton";
import { Task } from "@/types/Task";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TasksList = ({ tasks, setTasks }: Props) => {
  const handleCheck = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_task, i) => i !== index));
  };

  return (
    <ul className="space-y-[8px] p-[16px]">
      {tasks.map((task, idx) => (
        <li key={idx} className="flex w-full items-center">
          <input
            className="mr-[16px] h-[18px] w-[18px] outline-none"
            type="checkbox"
            id={`checkbox${idx}`}
            checked={task.isCompleted}
            onChange={() => handleCheck(idx)}
          />
          <label htmlFor={`checkbox${idx}`}>{task.name}</label>
          <BaseButton
            className="ml-auto h-[24px] w-[24px] rounded-full bg-white text-[10px]"
            type="button"
            onClick={() => deleteTask(idx)}
          >
            X
          </BaseButton>
        </li>
      ))}
    </ul>
  );
};
