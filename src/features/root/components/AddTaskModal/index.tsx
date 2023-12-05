"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BaseButton } from "@/components/ui/base/BaseButton";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Task } from "@/types/Task";

type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const AddTaskModal = ({ setTasks }: Props) => {
  const [taskDescription, setTaskDescription] = useState("");

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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <BaseButton className="absolute bottom-[16px] right-[16px] h-[64px] w-[64px] rounded-full border-[2px] border-black bg-green-400">
          +
        </BaseButton>
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
              <BaseButton
                className="h-[40px] rounded-[4px] bg-green-500 px-[12px] text-white focus:outline-none"
                onClick={addTask}
                disabled={taskDescription === ""}
              >
                保存
              </BaseButton>
            </Dialog.Close>
            <Dialog.Close asChild>
              <BaseButton className="h-[40px] rounded-[4px] bg-slate-400 px-[12px] text-white focus:outline-none">
                キャンセル
              </BaseButton>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
