import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function ProjectTaskSelect() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="project1">Project 1</SelectItem>
                <SelectItem value="project2">Project 2</SelectItem>
                <SelectItem value="project3">Project 3</SelectItem>
            </SelectContent>
        </Select>
    )
}
