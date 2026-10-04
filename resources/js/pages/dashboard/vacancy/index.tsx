import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Head, router } from "@inertiajs/react";
import { Edit, EllipsisVertical, Plus, Trash, User2 } from "lucide-react";
import React, { useState } from "react";
import { Vacancy } from "@/types/vacancy";
import { Department } from "@/types/department";
import DataTable from "@/components/custom/data-table";
import { formatIdDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import DialogVacancy from "./dialog-vacancy";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchBox } from "@/components/custom/search-box";
import { AppPagination } from "@/components/custom/app-pagination";

interface Props {
    vacancies: {
        data: Vacancy[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    departments: Department[];
    filters: {
        search?: string
        department?: string | number
        user_create?: string
    }
}

const VACANCY_TABLE_HEADER = [
    'No', 'Position', 'Department', 'Job Description', 'Quota', 'Created By', 'Last Update'
]

export default function VacancyPage({ vacancies, departments, filters }: Props) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editing, setEditing] = useState<Vacancy | null>(null);

    const handleEdit = (vacancy: Vacancy) => {
        setEditing(vacancy);
        setOpenDialog(true);
    };

    const handleDelete = (vacancy: Vacancy) => {
        if (!confirm(`Delete "${vacancy.position}"?`)) return;
        router.delete(`/admin/vacancy/${vacancy.id}`, {
            onSuccess: () => toast.success('Product deleted.'),
        });
    }

    const handleClose = () => {
        setOpenDialog(false);
        setEditing(null);
    };

    const handleDialogOpenChange = (open: boolean) => {
        setOpenDialog(open);

        if (!open) {
            setEditing(null);
        }
    };

    const tableData = vacancies.data.map((vacancy, index) => {
        const number = (vacancies.current_page - 1) * vacancies.per_page + (index + 1)

        return [
            number,
            <div>
                {vacancy.position}
            </div>,
            <Badge variant={"outline"}>
                {vacancy.department.name}
            </Badge>,
            <div>
                {vacancy.description}
            </div>,
            <div className="flex items-center gap-1">
                <User2 opacity={0.3} size={20} />
                {vacancy.quota}
            </div>,
            <Badge variant='outline'>
                {vacancy.user_create.split(' ', 1)}
            </Badge>,
            <div>
                {vacancy.updated_at ? formatIdDate(vacancy.updated_at) : formatIdDate(vacancy.created_at)}
            </div>,
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant={'ghost'} className="text-muted-foreground size-8" size='icon'>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32" >
                    <DropdownMenuItem onClick={() => handleEdit(vacancy)}>
                        <span className="flex items-center gap-2">
                            <Edit />
                            Edit
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(vacancy)} variant={'destructive'}>
                        <span className="flex items-center gap-2">
                            <Trash className="text-red-400" />
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ]
    })

    return (
        <>
            <Toaster closeButton position="top-center" />
            <Head title="Job Vacancy" />
            <header className="py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">Job Vacancy</h1>
                <Dialog open={openDialog} onOpenChange={handleDialogOpenChange}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Post a Job
                        </Button>
                    </DialogTrigger>

                    {openDialog && (
                        <DialogVacancy
                            key={editing?.id ?? "new"}
                            departments={departments}
                            vacancy={editing}
                            onClose={handleClose}
                        />
                    )}
                </Dialog>
            </header>
            <SearchBox routeName='/admin/vacancy' name='search' value={filters.search} filters={filters} placeholder='Search position...' />
            <DataTable data={tableData} header={VACANCY_TABLE_HEADER} />
            <div className="py-3 flex items-center justify-end">
                <AppPagination
                    links={vacancies.links}
                    currentPage={vacancies.current_page}
                    lastPage={vacancies.last_page}
                />
            </div>
        </>
    );
}

VacancyPage.layout = (page: React.ReactNode) => (
    <DashboardLayout children={page} />
);
