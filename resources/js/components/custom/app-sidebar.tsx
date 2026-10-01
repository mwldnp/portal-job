import { Briefcase, BriefcaseBusiness, Building2Icon, FileUser, LayoutDashboard, Users2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { cn } from "cn";
import { usePage } from "@inertiajs/react";

export function AppSidebar() {

    const { url } = usePage()

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
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="flex items-center gap-2" size={"lg"}>
                            <a href="" className="px-1.5 text-base! h-auto font-bold text-white hover:bg-primary hover:text-black">
                                <Briefcase />
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
                                    return (
                                        <SidebarMenuItem key={item.title} className="flex items-center gap-2">
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className={cn('text-sm px-2 h-auto', { 'bg-primary text-black hover:bg-primary! hover:text-black!': url === item.url })}>
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
        </Sidebar>
    )
}