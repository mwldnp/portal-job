import { AppPagination } from "@/components/custom/app-pagination";
import { DarkmodeToggle } from "@/components/custom/darkmode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Department } from "@/types/department";
import { Vacancy } from "@/types/vacancy";
import { Head, router, usePage } from "@inertiajs/react";
import { Briefcase, BriefcaseBusiness, Building2, LogOut, User2, UserCircle2 } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SheetApplicant from "./sheet-applicant";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useState } from "react";
import { Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogLogout from "@/components/custom/dialog-logout";

interface Props {
    vacancies: {
        data: Vacancy[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    }
    departments: Department[];
}

export default function HomePage({ vacancies, departments }: Props) {

    const { url } = usePage()
    const user = useAuthUser()

    const [openVacancyId, setOpenVacancyId] = useState<number | null>(null)
    const [dialogLogout, setDialogLogout] = useState(false)

    const currentDepartment = new URLSearchParams(
        url.split('?')[1] || ''
    ).get('department')

    const handleClose = () => {
        setOpenVacancyId(null)
    }

    return (
        <>
            <Toaster closeButton position="top-center" />
            <Head title="Portal Job" />
            <header className="h-18 px-8 border-b w-full flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center w-8 h-8 rounded-md bg-secondary">
                        <BriefcaseBusiness className="text-primary w-4 dark:text-white" />
                    </div>
                    <h1 className="text-xl font-bold">
                        <span className="text-primary">Karir</span>Ku
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    {
                        !user ? (
                            <Button onClick={() => router.get('/login')}> Login</Button>
                        ) : user.role === 'admin' ? (
                            <Button onClick={() => router.get('/admin')}>Dashboard</Button>
                        ) : user.role === 'guest' ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-lg">
                                        Hi, {user.name.split(' ', 1)}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => setDialogLogout(true)} className="p-2 cursor-pointer">
                                            <LogOut opacity={0.5} />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : null
                    }

                    <DarkmodeToggle />
                </div>
            </header >
            <section className="py-8 px-3 md:px-16 dark:bg-[#0f0f0f] min-h-screen">
                <div className="flex flex-col items-start gap-6 w-full md:w-1/2">
                    <Badge variant={"outline"} className="p-4 text-sm">
                        We're hiring!
                    </Badge>
                    <h1 className="text-5xl font-bold">
                        Be part of our mission
                    </h1>
                    <p className="font-medium">
                        We’re seeking passionate individuals to help drive our
                        vision forward. Our culture thrives on flat hierarchies,
                        transparent communication, and empowering everyone with
                        ownership and responsibility.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-8 mb-6">
                    <Button
                        onClick={() =>
                            router.get('/',
                                { department: "" },
                                { preserveState: true },
                            )
                        }
                        variant={!currentDepartment ? 'default' : 'outline'}
                        className="rounded-full px-4"
                    >All</Button>
                    {
                        departments.map((department) => {
                            return (
                                <Button
                                    key={department.id}
                                    onClick={() =>
                                        router.get('/',
                                            { department: department.name },
                                            { preserveState: true },
                                        )
                                    }
                                    variant={currentDepartment === department.name ? 'default' : 'outline'}
                                    className="rounded-full px-4"
                                >
                                    {department.name}
                                </Button>
                            )
                        })
                    }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {
                        vacancies.data.map((vacancy) => {
                            return (
                                <Card key={vacancy.position}>
                                    <CardHeader>
                                        <CardTitle className="font-bold">
                                            {vacancy.position}
                                        </CardTitle>
                                        <CardDescription>
                                            {vacancy.description}
                                        </CardDescription>
                                        {
                                            user.role != 'admin' && (
                                                <CardAction>
                                                    <Sheet
                                                        open={openVacancyId === vacancy.id}
                                                        onOpenChange={(open) => setOpenVacancyId(open ? vacancy.id : null)}
                                                    >
                                                        <SheetTrigger asChild>
                                                            <Button variant='link' size='sm' className="p-0">Apply</Button>
                                                        </SheetTrigger>
                                                        <SheetApplicant vacancy={vacancy} onClose={handleClose} />
                                                    </Sheet>
                                                </CardAction>
                                            )
                                        }

                                    </CardHeader>
                                    <CardContent className="flex flex-wrap gap-3">
                                        <Badge variant='secondary' className="p-3 flex items-center gap-2"><Building2 />{vacancy.department.name}</Badge>
                                        <Badge variant='secondary' className="p-3 flex items-center gap-2"><User2 />{vacancy.quota}</Badge>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>

                <AppPagination
                    links={vacancies.links}
                    currentPage={vacancies.current_page}
                    lastPage={vacancies.last_page}
                    className="mt-6"
                />

                <DialogLogout open={dialogLogout} onOpenChange={setDialogLogout} />
            </section >
        </>
    );
}
