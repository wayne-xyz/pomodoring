"use client"
import { useUserState } from "./hooks/useUserState";
import Header from "./header";
import { TasksCombobox } from "./ui/TasksCombobox";
import PomodoroTimer from "./ui/PomodoroTimer";
import { useEffect, useState } from "react";

export default function Home() {
  const { userState } = useUserState();
  const [currentTask, setCurrentTask] = useState({
    taskId: null,
    taskName: null,
    status: null,
    priority: null
  });


  useEffect(() => {
    console.log('currentTask changed:', currentTask)
  }, [currentTask])


  return (
    <div>
      <Header />
      <div className="mt-[30vh] flex items-center justify-center">
        <PomodoroTimer currentTask={currentTask} />
      </div>
      {userState && (
        <div className="flex flex-row justify-center items-center gap-4 mt-12">
          <TasksCombobox userId={userState.userId} onTaskSelect={task => setCurrentTask(
            {
              taskId: task.value, //task.value is the taskId because of format in the TasksCombobox
              taskName: task.label, //task.label is the taskName because of format in the TasksCombobox
              status: task.status
            }
          )} />
        </div>
      )}
    </div>
  );
}
