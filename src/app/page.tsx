"use client";

import { TASKS } from "@/constants/tasks";
import { ChangeEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const HomePage = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [taskDescription, setTaskDescription] = useState("");

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const addTask = () => {
    if (taskDescription) {
      setTasks((prev) => [
        ...prev,
        {
          name: taskDescription,
          isCompleted: false,
        },
      ]);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="relative left-[50%] top-[50%] h-[512px] w-[320px] translate-x-[-50%] translate-y-[-50%] border border-black">
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
                onClick={() => deleteTask(idx)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="absolute bottom-[16px] right-[16px] h-[64px] w-[64px] rounded-full border-[2px] border-black bg-green-400">
              +
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 m-auto bg-black/20" />
            <Dialog.Content className="fixed inset-0 m-auto h-[256px] w-[280px] space-y-[12px] rounded-[6px] bg-white p-[24px] pt-[40px] focus:outline-none">
              <Dialog.Title className="text-[24px] font-bold text-green-500">
                新規登録
              </Dialog.Title>
              <input
                type="text"
                placeholder="タスク名"
                className="w-full rounded border-[2px] border-black p-[8px]"
                value={taskDescription}
                onChange={handleChange}
              />
              {taskDescription !== "" || (
                <div className="font-medium text-red-500">
                  タスク名を入力してください
                </div>
              )}
              <div className="absolute bottom-[16px] right-[16px] flex space-x-[16px]">
                <Dialog.Close asChild>
                  <button
                    className="flex h-[40px] items-center justify-center rounded-[4px] bg-green-500 px-[12px] text-white focus:outline-none"
                    onClick={addTask}
                    disabled={taskDescription === ""}
                  >
                    保存
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button className="flex h-[40px] items-center justify-center rounded-[4px] bg-slate-400 px-[12px] text-white focus:outline-none">
                    キャンセル
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default HomePage;
