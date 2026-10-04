import DataTable from "@/components/custom/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import DashboardLayout from "@/layouts/dashboard-layout"
import { Department } from "@/types/department"
import { Head } from "@inertiajs/react"
import React from "react"
import DialogCreeateDepartment from "./dialog-create-department"

interface Props {
    departments: Department[]
}

const DEPARTMENT_TABLE_HEADER = [
    'No', 'Name', 'Action'
]

export default function DepartmentPage({ departments }: Props) {

    const tableData = departments.map((department, index) => {
        return [
            index + 1,
            <div>
                {department.name}
            </div>,
            <div>
                <a href="">Edit</a>
                <a href="">Delete</a>
            </div>
        ]
    })

    return (
        <>
            <Head title="Department" />
            <div className="py-5 flex items-center justify-between">
                <h1 className="text-xl font-bold">Department Data</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Department</Button>
                    </DialogTrigger>
                    <DialogCreeateDepartment />
                </Dialog>
            </div>
            <DataTable header={DEPARTMENT_TABLE_HEADER} data={tableData} isLoading={false} />
        </>
    )
}

DepartmentPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />