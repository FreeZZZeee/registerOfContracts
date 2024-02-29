"use client"

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
 } from "@/components/ui/dropdown-menu";

 import {
    Avatar,
    AvatarImage,
    AvatarFallback
 } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

 export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100" align="end">   
                <DropdownMenuItem className="flex flex-col items-start">
                    <span className="block text-sm text-gray-900 dark:text-white">{user?.name}</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                </DropdownMenuItem>             
                <Link href={"/profile"}>
                    <DropdownMenuItem>
                        <CgProfile className="h-4 w-4 mr-2"/>
                        Профиль
                    </DropdownMenuItem>
                </Link>
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        Выход
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
 };