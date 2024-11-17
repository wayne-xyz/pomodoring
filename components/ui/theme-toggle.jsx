"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup 
      type="single" 
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value)
      }}
      className="flex gap-1"
    >
      <ToggleGroupItem 
        value="light" 
        aria-label="Light mode"
        className={`data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-primary/10 ${theme === 'light' ? 'bg-primary/20 text-primary' : ''}`}
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="dark" 
        aria-label="Dark mode"
        className={`data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-primary/10 ${theme === 'dark' ? 'bg-primary/20 text-primary' : ''}`}
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="system" 
        aria-label="System mode"
        className={`data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-primary/10 ${theme === 'system' ? 'bg-primary/20 text-primary' : ''}`}
      >
        <Laptop className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
