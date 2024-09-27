'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LoginDropdownMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    console.log("Logging in with Google")
    // Simulating a successful login
    setIsLoggedIn(true)
    setUser({ name: 'John Doe', email: 'john@example.com', avatar: 'https://github.com/shadcn.png' })
  }

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoggedIn ? (
          <Avatar  className=" rounded-full h-8 w-8 cursor-pointer">
            <AvatarImage className="rounded-full" src={user.avatar} alt={user.name} />
            <AvatarFallback  className="rounded-full">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
            <Button variant="ghost" className="px-2 py-1">Login</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel className="font-normal py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="px-3 py-2.5 text-sm cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2.5 text-sm cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="px-3 py-2.5 text-sm cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem 
            onClick={handleGoogleLogin}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Login with Google
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
