'use client';

import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FaUser } from "react-icons/fa";
import { signOut } from "next-auth/react";


const UserButton = () => {
    const user = useCurrentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
                <Avatar className="border-none outline-none rounded-full select-none bg-sky-500">
                    <AvatarImage className="border-none outline-none rounded-full overflow-hidden select-none" width={40} height={40} src={user?.image || ""} />
                     <AvatarFallback >
                        <FaUser/>
                     </AvatarFallback>
                </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-white text-black border-none outline-none" align="end">
          <span onClick={()=> signOut()}>
            <DropdownMenuItem >
              Logout
            </DropdownMenuItem>
          </span>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
