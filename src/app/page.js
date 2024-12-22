"use client"
import { useUserState } from "./hooks/useUserState";
import Header from "./header";
import { TasksCombobox } from "./ui/TasksCombobox";
import PomodoroTimer from "./ui/PomodoroTimer";

export default function Home() {
  const { userState } = useUserState();

  return (
    <div>
      <Header />
      <div className="mt-[30vh] flex items-center justify-center">
        <PomodoroTimer />
      </div>
      {userState && (
        <div className="flex flex-row justify-center items-center gap-4 mt-12">
          <TasksCombobox userId={userState.userId} />
        </div>
      )}
    </div>
  );
}
