import Header from "./header";

import { Button } from "@/components/ui/button";
import PomodoroTimer from "./ui/PomodoroTimer";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-64">
        <PomodoroTimer />
      </div>
      <div className="flex flex-row justify-center items-center  gap-4 mt-12">
        <Button variant="ghost">Project 1/Task 1</Button>
      </div>
    </div>
  );
}
