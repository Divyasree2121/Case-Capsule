'use client';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserNav() {
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, you would clear the user session here.
        router.push('/auth');
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-auto w-full justify-start gap-2 p-2 text-left"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@divyasree" />
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium">divya sree</span>
            <span className="truncate text-xs text-muted-foreground">
              divyasreenika@gmail.com
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">divya sree</p>
            <p className="text-xs leading-none text-muted-foreground">
              divyasreenika@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Appearance</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
