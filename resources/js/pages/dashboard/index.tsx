import DashboardLayout from "@/layouts/dashboard-layout";
import React from "react";

export default function DashboardPage() {

    return (
        <div>
            <h1>Ini halaman dashboard</h1>
        </div>
    )
}

DashboardPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />