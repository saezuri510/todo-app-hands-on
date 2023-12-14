import { Task } from "@/types/Task";
import { fetcher } from "@/utils/fetcher";
import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const AddTaskModal = ({ setTasks }: Props): JSX.Element => {
  const [taskDescription, setTaskDescription] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleClick = async () => {
    if (taskDescription) {
      const createdTask: Task = await fetcher(
        `http://localhost:3000/api/task/create`,
        {
          method: "POST",
          body: { name: taskDescription },
        },
      );

      setTasks((prev) => [...prev, createdTask]);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="absolute bottom-[16px] right-[16px] flex h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-full border-[2px] border-black bg-green-400"
        >
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
                type="button"
                className="flex h-[40px] cursor-pointer items-center justify-center rounded-[4px] bg-green-500 px-[12px] text-white focus:outline-none"
                onClick={handleClick}
                disabled={taskDescription === ""}
              >
                保存
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-[40px] cursor-pointer items-center justify-center rounded-[4px] bg-slate-400 px-[12px] text-white focus:outline-none"
              >
                キャンセル
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
