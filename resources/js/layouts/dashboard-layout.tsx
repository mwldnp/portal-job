import { AppSidebar } from "@/components/custom/app-sidebar";
import { DarkmodeToggle } from "@/components/custom/darkmode-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { url } = usePage()

    const paths = url.split('?')[0].split('/').filter(Boolean)

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
                    <div className="flex w-full items-center px-4">
                        <SidebarTrigger className="-ml-1 mr-2 cursor-pointer" size={"lg"} />

                        <div className="flex items-center gap-2">

                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {
                                        paths.map((path, index) => {
                                            return (
                                                <Fragment key={`path-${path}`}>
                                                    <BreadcrumbItem className="capitalize">
                                                        {
                                                            index < paths.length - 1 ? (
                                                                <BreadcrumbLink href={`/${paths.slice(0, index + 1).join('/')}`}>
                                                                    {path}
                                                                </BreadcrumbLink>
                                                            ) : (
                                                                <BreadcrumbPage>
                                                                    {path}
                                                                </BreadcrumbPage>
                                                            )
                                                        }

                                                    </BreadcrumbItem>
                                                    {index < paths.length - 1 && <BreadcrumbSeparator />}
                                                </Fragment>
                                            )
                                        })
                                    }

                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>

                    <div className="px-4">
                        <DarkmodeToggle />
                    </div>
                </header>
                <main className="p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}