'use client'

import { useAuth } from '../hooks/userAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import GoogleButton from './GoogleButton';

export default function LoginDropdownMenu() {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Avatar className="rounded-full h-8 w-8 cursor-pointer">
            <AvatarImage className="rounded-full" src={user.photoURL} alt={user.displayName} />
            <AvatarFallback className="rounded-full">{user.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <GoogleButton onClick={handleGoogleLogin} />
        )}
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-normal py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
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
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
