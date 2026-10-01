import DashboardLayout from "@/layouts/dashboard-layout"
import React from "react"

export default function DepartmentPage() {
    return (
        <h1>Halaman Department</h1>
    )
}

DepartmentPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />