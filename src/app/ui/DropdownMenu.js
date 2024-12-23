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
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const getUserTypeDisplay = (userType) => {
  switch (userType) {
    case 'unpaid':
      return 'Basic User';
    case 'annual':
      return 'Annual Member';
    case 'lifetime':
      return 'Lifetime Member';
    default:
      return 'Basic User';
  }
};

export default function LoginDropdownMenu() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();

    } catch (error) {
      console.error("Failed to sign in", error);
      if (error.message === 'Unauthorized email in development mode') {
        toast({
          title: "Unauthorized",
          description: "Your email is not authorized for login in development mode.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Sign in failed",
          description: "There was a problem signing you in.",
          variant: "destructive",
        })
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      
    } catch (error) {
      console.error("Failed to log out", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging you out.",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Avatar className="rounded-full cursor-pointer">
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
              <p className="text-xs leading-none text-muted-foreground mt-1">
                {getUserTypeDisplay(user.userType)}
              </p>
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
          <DropdownMenuItem className="px-3 py-2.5 text-sm cursor-pointer">
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
