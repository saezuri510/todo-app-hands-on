import { AddTaskModal } from "@/features/root/components/AddTaskModal";
import { TasksList } from "@/features/root/components/TasksList";
import { Props } from "@/features/root/getServerSideProps";
import { useState } from "react";

export const HomePage = ({ tasks: initialTasks }: Props) => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="relative left-[50%] top-[50%] h-[512px] w-[320px] translate-x-[-50%] translate-y-[-50%] border border-black">
        <header className="flex h-[64px] items-center justify-center bg-green-500 text-[24px] font-bold text-white">
          TODO List
        </header>
        <TasksList tasks={tasks} setTasks={setTasks} />
        <AddTaskModal />
      </div>
    </div>
  );
};
