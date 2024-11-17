import Header from "./header";

import { Button } from "@/components/ui/button";
import PomodoroTimer from "./ui/PomodoroTimer";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-[30vh] flex items-center justify-center">
        <PomodoroTimer />
      </div>
      <div className="flex flex-row justify-center items-center  gap-4 mt-12">
        <Button variant="ghost">Default Project/Pomodoro Session</Button>
      </div>
    </div>
  );
}
