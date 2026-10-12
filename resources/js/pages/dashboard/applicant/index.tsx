import { AppPagination } from "@/components/custom/app-pagination";
import DataTable from "@/components/custom/data-table";
import { SearchBox } from "@/components/custom/search-box";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Applicant } from "@/types/applicant";
import { Head } from "@inertiajs/react";
import React from "react";
import ApplicantSection from "./applicant-section";

interface Props {
    pending: {
        data: Applicant[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    approved: {
        data: Applicant[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    rejected: {
        data: Applicant[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    filters: {
        search?: string
        name?: string | number
    }

}

const APPLICANT_TABLE_HEADER = [
    'No', 'User', 'Full Name', 'Gender', 'DoB', 'No Telp', 'University', 'Major', 'IPK', 'CV'
]

export default function ApplicantPage({ pending, approved, rejected, filters }: Props) {
    return (
        <>
            <Head title="Applicant" />
            <header className="py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">Applicant Data</h1>
            </header>

            <SearchBox
                routeName="/admin/applicant"
                name="search"
                value={filters.search}
                filters={filters}
                placeholder="Search applicant..."
            />

            <Accordion type="multiple" defaultValue={['pending', 'approved', 'rejected']}>
                <ApplicantSection
                    title="Pending"
                    header={APPLICANT_TABLE_HEADER}
                    dataset={pending}
                />
                <ApplicantSection
                    title="Approved"
                    header={APPLICANT_TABLE_HEADER}
                    dataset={approved}
                />
                <ApplicantSection
                    title="Rejected"
                    header={APPLICANT_TABLE_HEADER}
                    dataset={rejected}
                />
            </Accordion>
        </>
    );
}
ApplicantPage.layout = (page: React.ReactNode) => <DashboardLayout children={page} />