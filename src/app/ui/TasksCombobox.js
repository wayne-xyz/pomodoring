"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchUserTasks, createTaskInFirestore, updateCurrentTask } from "../firestoreService/taskService"

export function TasksCombobox({ userId }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const defaultTaskCreated = React.useRef(false)

  // Fetch tasks when component mounts
  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        let userTasks = await fetchUserTasks(userId)
        console.log('Fetched tasks:', userTasks)
        
        // Only create default task if it hasn't been created yet
        if (userTasks.length === 0 && !defaultTaskCreated.current) {
          defaultTaskCreated.current = true
          const defaultTask = await createTaskInFirestore({
            userId,
            taskName: "Default Task",
            description: "This is your default task",
            status: "current", //first task is always current which means it's selected
            priority: 2
          })
          userTasks = [defaultTask]
          console.log('Default task created:', defaultTask)
        }

        // Transform tasks into the format needed for the combobox
        console.log('User tasks,start formatting:', userTasks)
        const formattedTasks = userTasks.map(task => ({
          value: task.taskId,
          label: task.taskName,
          status: task.status
        }))
        console.log('User tasks,after formatting:', formattedTasks)
        setTasks(formattedTasks)

        // Find and select the task with 'current' status
        const currentTask = formattedTasks.find(task => task.status === 'current')
        if (currentTask) {
          setValue(currentTask.value)
          console.log('Selected current task:', currentTask)
        }

      } catch (error) {
        console.error("Error loading tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadTasks()
    }
  }, [userId])

  const handleTaskSelect = async (task) => {
    console.log('Selecting task:', task)
    setValue(task.value)
    setOpen(false)
    
    await updateCurrentTask(userId, task.value)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tasks.find((task) => task.value === value)?.label
            : "Select task..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tasks..." />
          <CommandList>
            <CommandEmpty>No tasks found.</CommandEmpty>
            <CommandGroup>
              {tasks.map((task) => (
                <CommandItem
                  key={task.value}
                  value={task}
                  onSelect={() => handleTaskSelect(task)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      task.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span >
                    {task.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
