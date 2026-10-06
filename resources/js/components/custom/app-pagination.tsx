import React from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { router } from '@inertiajs/react'

interface PaginationProps {
    links: {
        url: string | null
        label: string
        active: boolean
    }[],
    currentPage: number
    lastPage: number
    className?: string
}
export const AppPagination: React.FC<PaginationProps> = ({ links, currentPage, lastPage, className }) => {
    if (lastPage <= 1) return null

    return (
        <Pagination className={className}>
            <PaginationContent>
                {
                    links.map((link, index) => {
                        if (link.label.includes('Previous')) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationPrevious onClick={() => link.url && router.get(link.url, {}, { preserveState: true })} />
                                </PaginationItem>
                            )
                        }

                        if (link.label.includes('Next')) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationNext onClick={() => link.url && router.get(link.url, {}, { preserveState: true })} />
                                </PaginationItem>
                            )
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={link.active}
                                    onClick={() =>
                                        link.url && router.get(link.url, {}, { preserveState: true })
                                    } >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })
                }
            </PaginationContent>
        </Pagination>
    )
}