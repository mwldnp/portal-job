import { AppPagination } from "@/components/custom/app-pagination";
import { DarkmodeToggle } from "@/components/custom/darkmode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomPageProps } from "@/types";
import { Department } from "@/types/department";
import { Vacancy } from "@/types/vacancy";
import { Head, router, usePage } from "@inertiajs/react";
import { Building2, User2 } from "lucide-react";

interface Props {
    vacancies: {
        data: Vacancy[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    }
    departments: Department[];
    filters: {
        department?: string;
    };
}

export default function HomePage({ vacancies, departments, filters }: Props) {

    const { url } = usePage()
    const { auth } = usePage<CustomPageProps>().props
    const user = auth.user

    const currentDepartment = new URLSearchParams(
        url.split('?')[1] || ''
    ).get('department')

    return (
        <>
            <Head title="Portal Job" />
            <nav className="h-14 px-8 border-b w-full flex justify-center items-center">
                <div className="w-full text-center">Logo</div>
                <div className="ml-auto flex items-center gap-2">
                    {
                        user.role === 'admin' ? (<Button onClick={() => router.get('/admin')}>Dashboard</Button>) : (
                            <Button onClick={() => router.get('/login')}> Login</Button>
                        )
                    }
                    <DarkmodeToggle />
                </div>
            </nav >
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
                        vacancies.data.map((vacancy, index) => {
                            return (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-bold">
                                            {vacancy.position}
                                        </CardTitle>
                                        <CardDescription>
                                            {vacancy.description}
                                        </CardDescription>
                                        <CardAction>
                                            <Button variant='link' size='sm' className="p-0">Apply</Button>
                                        </CardAction>
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
            </section >
        </>
    );
}
