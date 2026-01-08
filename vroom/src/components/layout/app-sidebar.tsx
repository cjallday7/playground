// Sidebar Component for Navigation and Layout

//placeholder icons
import { Calendar, Home, Inbox, Search, Settings, User, ChevronUp } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { 
    DropdownMenu,
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu"

//nav items
const navItems = [
  { label: "Paddock", icon: Home, href: "/" },
  { label: "Race Central", icon: Search, href: "/search" },
  { label: "Drivers", icon: Settings, href: "/settings" },
  { label: "Constructors", icon: Inbox, href: "/inbox" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User className="w-4 h-4" /> @hypraktiv
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Settings className="mr-2 w-4 h-4" /> Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}