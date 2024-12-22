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
import { fetchUserTasks, createTaskInFirestore } from "../firestoreService/taskService"

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
        
        // Only create default task if it hasn't been created yet
        if (userTasks.length === 0 && !defaultTaskCreated.current) {
          defaultTaskCreated.current = true
          const defaultTask = await createTaskInFirestore({
            userId,
            title: "Default Task",
            description: "This is your default task",
            status: "in-progress",
            priority: 2
          })
          userTasks = [defaultTask]
        }

        // Transform tasks into the format needed for the combobox
        const formattedTasks = userTasks.map(task => ({
          value: task.taskId,
          label: task.taskName,
          status: task.status
        }))

        setTasks(formattedTasks)
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

  if (loading) {
    return <Button variant="outline" className="w-[200px]">Loading tasks...</Button>
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
                  value={task.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === task.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className={cn(
                    task.status === 'completed' && "line-through text-muted-foreground"
                  )}>
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
