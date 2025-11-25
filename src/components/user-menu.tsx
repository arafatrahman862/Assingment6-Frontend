/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOutIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/redux/hook";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

export default function UserMenu({ data }: any) {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    await logout(undefined);
    navigate("/")
    dispatch(authApi.util.resetApiState());
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={data?.data?.picture } alt="Profile image" />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64 mt-2 rounded-none" align="end">
        {/* User Info */}
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{data?.data?.name}</span>
          <span className="truncate text-xs font-normal">
            {data?.data?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-none"
        >
          <LogOutIcon size={16} className="mr-2" aria-hidden="true" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
