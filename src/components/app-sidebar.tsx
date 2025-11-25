
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link, useLocation } from "react-router"
import { generateSidebarItems } from "@/utils/generateSidebarItems"
import { useUserInfoQuery, useLogoutMutation, authApi } from "@/redux/features/auth/auth.api"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { useAppDispatch } from "@/redux/hook"
import { useNavigate } from "react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)
  const data = {
    navMain: generateSidebarItems(userData?.data?.role),
  }

  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout(undefined)
    navigate("/")
    dispatch(authApi.util.resetApiState())
  }

  return (
    <Sidebar className="" {...props}>
      <SidebarHeader className="bg-background pl-4 py-4">
        <div className="flex justify-between">
          <Link to="/"><Logo /></Link> 
          <SidebarTrigger className="-ml-1 md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background border-t flex flex-col justify-between">
        <div>
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="rounded-none text-primary">{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem className="rounded-none" key={item.title}>
                      <SidebarMenuButton className="rounded-none text-md " asChild  isActive={location.pathname === item.url}>
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button
            variant="default"
            className="w-full rounded-none flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOutIcon size={16} />
            Logout
          </Button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
