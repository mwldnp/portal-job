import { Briefcase, BriefcaseBusiness, Building2Icon, EllipsisVertical, FileUser, LayoutDashboard, LogOut, Users2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { cn } from "cn";
import { usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CustomPageProps } from "@/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import DialogLogout from "./dialog-logout";

export function AppSidebar() {

    const [dialogOpen, setDialogOpen] = useState(false)

    const { auth } = usePage<CustomPageProps>().props
    const user = auth.user

    const { url } = usePage()
    const currentPath = url.split("?")[0]

    const { isMobile } = useSidebar()

    const menus = [
        {
            title: 'Dashboard',
            url: '/admin',
            icon: LayoutDashboard
        },
        {
            title: 'User Management',
            url: '/admin/user',
            icon: Users2
        },
        {
            title: 'Department',
            url: '/admin/department',
            icon: Building2Icon
        },
        {
            title: 'Job Vacancy',
            url: '/admin/vacancy',
            icon: BriefcaseBusiness
        },
        {
            title: 'Applicant',
            url: '/admin/applicant',
            icon: FileUser
        },
    ]


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size={"lg"}>
                            <a href="/" className=" text-base! h-auto font-bold">
                                <div className="px-2">
                                    <Briefcase />
                                </div>
                                Portal Job</a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-3">
                            {
                                menus.map((item) => {
                                    const isActive = item.url === '/admin' ? currentPath === item.url : currentPath.startsWith(item.url);

                                    return (
                                        <SidebarMenuItem key={item.title} className="flex items-center gap-2">
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}
                                                    className={cn(
                                                        "text-sm px-2 h-auto",
                                                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                                    )}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size='lg' className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-8 w-8 rounded-full">
                                        <AvatarFallback className="rounded-full">
                                            {user.name.slice(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.name.split(' ', 1)}</span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {user.role}
                                        </span>
                                    </div>
                                    <EllipsisVertical />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-full">
                                            <AvatarFallback className="rounded-full">
                                                {user.name.slice(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user.name.split(' ', 1)}</span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => setDialogOpen(true)} className="p-2">
                                        <LogOut opacity={0.5} />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <DialogLogout open={dialogOpen} onOpenChange={setDialogOpen} />
        </Sidebar>
    )
}