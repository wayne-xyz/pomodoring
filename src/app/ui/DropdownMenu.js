// this is the dropdown menu for the header

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function LoginDropdownMenu() {
  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    console.log("Logging in with Google");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Login</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleGoogleLogin}>
          Login with Google
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
