import DepartmentController from "@/actions/App/Http/Controllers/DepartmentController";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/layouts/dashboard-layout";
import { BriefcaseBusiness, Building2, Users2 } from "lucide-react";
import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

interface Props {
    name: string
    total_quota: number
    accepted: number
    rejected: number
    remaining_quota: number
}

interface GrandTotal {
    total_quota: number;
    accepted: number;
    rejected: number;
    remaining_quota: number;
}

const SUMMARY_HEADER = ['Deparments', 'Quota', 'Accepted', 'Rejected', 'Remaining']

const chartConfig = {
    accepted: {
        label: "Accepted",
        color: "#16A34A",
    },
    rejected: {
        label: "Rejected",
        color: "#DC2626",
    },
    remaining_quota: {
        label: "Remaining",
        color: "#F59E0B",
    },
} satisfies ChartConfig

interface Stats {
    total_department: number
    total_vacancy: number
    total_applicant: number
}

export default function DashboardPage({ departments, grandTotal, stats }: { departments: Props[], grandTotal: GrandTotal, stats: Stats }) {

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-6">
                <Card>
                    <CardContent className="flex items-center gap-3">
                        <div className="bg-accent w-12 h-12 flex items-center justify-center rounded-lg border">
                            <Building2 size={20} />
                        </div>
                        <div className="space-y-1">
                            <h3>Total Department</h3>
                            <p className="text-xl">{stats.total_department}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3">
                        <div className="bg-accent w-12 h-12 flex items-center justify-center rounded-lg border">
                            <BriefcaseBusiness size={20} />
                        </div>
                        <div className="space-y-1">
                            <h3>Total Job Vacancy</h3>
                            <p className="text-xl">{stats.total_vacancy}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3">
                        <div className="bg-accent w-12 h-12 flex items-center justify-center rounded-lg border">
                            <Users2 size={20} />
                        </div>
                        <div className="space-y-1">
                            <h3>Total Applicant</h3>
                            <p className="text-xl">{stats.total_applicant}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <h2 className="font-semibold text-xl pb-4">Remaining Quota by Department</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <section className="space-y-3">
                    <Card className="p-0">
                        <Table className="w-full overflow-hidden rounded-md">
                            <TableHeader className="bg-muted sticky top-0 z-10">
                                <TableRow>
                                    {
                                        SUMMARY_HEADER.map((header, index) => {
                                            return (
                                                <TableHead key={`th-${index}`} className="px-3">
                                                    {header}
                                                </TableHead>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    departments.map((dept, deptIndex) => {
                                        return (
                                            <TableRow key={`row-${deptIndex}`}>
                                                <TableCell className="px-3 whitespace-normal break-word">{dept.name}</TableCell>
                                                <TableCell className="px-3 whitespace-normal break-word">{dept.total_quota}</TableCell>
                                                <TableCell className="px-3 whitespace-normal break-word">{dept.accepted}</TableCell>
                                                <TableCell className="px-3 whitespace-normal break-word">{dept.rejected}</TableCell>
                                                <TableCell className="px-3 whitespace-normal break-word">{dept.remaining_quota}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                <TableRow className="font-semibold bg-muted">
                                    <TableCell className="px-3 whitespace-normal break-word">Grand Total</TableCell>
                                    <TableCell className="px-3 whitespace-normal break-word">{grandTotal.total_quota}</TableCell>
                                    <TableCell className="px-3 whitespace-normal break-word">{grandTotal.accepted}</TableCell>
                                    <TableCell className="px-3 whitespace-normal break-word">{grandTotal.rejected}</TableCell>
                                    <TableCell className="px-3 whitespace-normal break-word">{grandTotal.remaining_quota}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </section>
                <section>
                    <Card className="h-full">
                        <ChartContainer config={chartConfig} className="w-full h-full mt-auto pr-10">
                            <BarChart accessibilityLayer data={departments}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="accepted" stackId="status" fill="var(--color-accepted)" />
                                <Bar dataKey="rejected" stackId="status" fill="var(--color-rejected)" />
                                <Bar dataKey="remaining_quota" stackId="status" fill="var(--color-remaining_quota)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </Card>
                </section>
            </div>
        </div >
    )
}

DashboardPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />