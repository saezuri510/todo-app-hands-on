"use client";

import { TASKS } from "@/constants/tasks";
import { useState } from "react";

const HomePage = () => {
  const [tasks, setTasks] = useState(TASKS);

  const handleCheck = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const handleClick = (index: number) => {
    setTasks((prev) => prev.filter((_task, i) => i !== index));
  };

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="fixed inset-0 m-auto h-[512px] w-[320px] border border-black">
        <header className="flex h-[64px] items-center justify-center bg-green-500 text-[24px] font-bold text-white">
          TODO List
        </header>
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
              <button
                className="ml-auto flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-white text-[10px]"
                type="button"
                onClick={() => handleClick(idx)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
