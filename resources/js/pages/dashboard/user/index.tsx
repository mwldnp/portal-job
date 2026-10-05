import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Head, router } from "@inertiajs/react";
import { Edit, EllipsisVertical, LockKeyhole, Plus, Trash, User2 } from "lucide-react";
import React, { useState } from "react";
import DataTable from "@/components/custom/data-table";
import { formatIdDate } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchBox } from "@/components/custom/search-box";
import { AppPagination } from "@/components/custom/app-pagination";
import DialogUser from "./dialog-user";
import { User } from "@/types";

interface Props {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    filters: {
        search?: string
    }
}

const USER_TABLE_HEADER = [
    'No', 'Name', 'Email', 'Role', 'Created At'
]

export default function UserPage({ users, filters }: Props) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setEditing(user);
        setOpenDialog(true);
    };

    const handleDelete = (user: User) => {
        if (!confirm(`Delete "${user.name}"?`)) return;
        router.delete(`/admin/user/${user.id}`, {
            onSuccess: () => toast.success('User deleted.'),
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

    const tableData = users.data.map((user, index) => {
        const number = (users.current_page - 1) * users.per_page + (index + 1)

        return [
            number,
            <div>
                {user.name}
            </div>,
            <div>
                {user.email}
            </div>,
            <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                    <LockKeyhole size='16px' opacity={0.5} />
                ) : <User2 size='16px' opacity={0.5} />
                }

                {user.role}
            </div>,
            <div>
                {user.updated_at ? formatIdDate(user.updated_at) : formatIdDate(user.created_at)}
            </div>,
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant={'ghost'} className="text-muted-foreground size-8" size='icon'>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32" >
                    <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <span className="flex items-center gap-2">
                            <Edit />
                            Edit
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(user)} variant={'destructive'}>
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
                        <DialogUser
                            key={editing?.id ?? "new"}
                            user={editing}
                            onClose={handleClose}
                        />
                    )}
                </Dialog>
            </header>
            <SearchBox routeName='/admin/user' name='search' value={filters.search} filters={filters} placeholder='Search user...' />
            <DataTable data={tableData} header={USER_TABLE_HEADER} />
            <div className="py-3 flex items-center justify-end">
                <AppPagination
                    links={users.links}
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                />
            </div>
        </>
    );
}

UserPage.layout = (page: React.ReactNode) => (
    <DashboardLayout children={page} />
);
