import DataTable from "@/components/custom/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import DashboardLayout from "@/layouts/dashboard-layout"
import { Department } from "@/types/department"
import { Head, router } from "@inertiajs/react"
import React, { useState } from "react"
import { toast, Toaster } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, EllipsisVertical, Plus, Trash } from "lucide-react"
import DialogDepartment from "./dialog-department"
import { SearchBox } from "@/components/custom/search-box"
import { AppPagination } from "@/components/custom/app-pagination"

interface Props {
    departments: {
        data: Department[]
        links: { url: string | null; label: string; active: boolean }[]
        current_page: number
        last_page: number
        per_page: number
    },
    filters: {
        search?: string
    }
}

const DEPARTMENT_TABLE_HEADER = [
    'No', 'Name'
]

export default function DepartmentPage({ departments, filters }: Props) {

    const [openDialog, setOpenDialog] = useState(false)
    const [editing, setEditing] = useState<Department | null>(null)

    const handleEdit = (department: Department) => {
        setEditing(department)
        setOpenDialog(true)
    }

    const handleDelete = (department: Department) => {
        if (!confirm(`Delete "${department.name}?"`)) return;
        router.delete(`/admin/department/${department.id}`, {
            onSuccess: () => toast.success('Department deleted.')
        })
    }

    const handleClose = () => {
        setOpenDialog(false)
        setEditing(null)
    }

    const handleDialogOpenChange = (open: boolean) => {
        setOpenDialog(open)

        if (!open) {
            setEditing(null)
        }
    }

    const tableData = departments.data.map((department, index) => {
        const number = (departments.current_page - 1) * departments.per_page + (index + 1)

        return [
            number,
            <div>
                {department.name}
            </div>,
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant={'ghost'} className="text-muted-foreground size-8" size='icon'>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32" >
                    <DropdownMenuItem onClick={() => handleEdit(department)}>
                        <span className="flex items-center gap-2">
                            <Edit />
                            Edit
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(department)} variant={'destructive'}>
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
            <Head title="Department" />
            <div className="py-5 flex items-center justify-between">
                <h1 className="text-xl font-bold">Department Data</h1>
                <Dialog open={openDialog} onOpenChange={handleDialogOpenChange}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Add Department
                        </Button>
                    </DialogTrigger>
                    {
                        openDialog && (
                            <DialogDepartment key={editing?.id ?? 'new'}
                                department={editing}
                                onClose={handleClose}
                            />
                        )
                    }
                </Dialog>
            </div>
            <SearchBox routeName="/admin/department" name="search" value={filters.search} placeholder="Search deparment..." />
            <DataTable header={DEPARTMENT_TABLE_HEADER} data={tableData} />
            <div className="py-3 flex items-center justify-end">
                <AppPagination
                    links={departments.links}
                    currentPage={departments.current_page}
                    lastPage={departments.last_page}
                />
            </div>
        </>
    )
}

DepartmentPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />