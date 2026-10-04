import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card } from "../ui/card"

export default function DataTable({ header, data, isLoading }: { header: string[], data: (string | React.ReactNode)[][], isLoading?: boolean }) {
    return (
        <div className="flex flex-col gap-4 w-full overflow-x-auto">
            <Card className="p-0">
                <Table className=" w-full overflow-hidden rounded-lg">
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            {
                                header.map((column, colIndex) => {
                                    if (colIndex === header.length - 1) {
                                        return (
                                            <TableHead key={`th-${column}`} className="px-6 py-3" colSpan={2}>{column}</TableHead>
                                        )
                                    }
                                    return (
                                        <TableHead key={`th-${column}`} className="px-6 py-3">{column}</TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.map((row, rowIndex) => {
                                return (
                                    <TableRow key={`row-${rowIndex}`} className="py-5" >
                                        {
                                            row.map((column, index) => {
                                                return <TableCell key={`tc-${index}`} className="px-6 py-3 whitespace-normal break-word">
                                                    {column}
                                                </TableCell>
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                        {
                            data?.length === 0 && !isLoading && (
                                <TableRow>
                                    <TableCell colSpan={header.length} className="h-16 text-center">
                                        No data available.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            isLoading && (
                                <TableRow>
                                    <TableCell colSpan={header.length} className="h-16 text-center animate-pulse">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </Card>

        </div>
    )
}