import { AppPagination } from "@/components/custom/app-pagination";
import DataTable from "@/components/custom/data-table";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Applicant } from "@/types/applicant";
import { CircleCheck, CircleX, EllipsisVertical, FileText } from "lucide-react";
import { router } from "@inertiajs/react";

interface Props {
    title: string;
    header: string[];
    dataset: {
        data: Applicant[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
}

export default function ApplicantSection({ title, header, dataset }: Props) {
    const tableData = dataset.data.map((data, index) => {
        const number = (dataset.current_page - 1) * dataset.per_page + (index + 1);

        const filename = data.path_cv.split('/').pop()

        return [
            number,
            data.user.name,
            data.name,
            data.gender,
            data.dob,
            data.no_telp,
            data.university,
            data.major,
            data.ipk,
            <a
                href={`/storage/${data.path_cv}`}
                target="_blank"
                className={cn(buttonVariants({ variant: "outline", size: 'sm' }), 'text-xs rounded-full no-underline! items-center')}
            >
                <FileText /> {filename?.split('.').pop()?.toUpperCase()}
            </a>
            ,
            title === 'Pending' ? (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild >
                        <Button variant={'ghost'} className="text-muted-foreground size-8" size='icon'>
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32" >
                        <DropdownMenuItem className="text-green-600 focus:bg-green-200 dark:focus:bg-green-200/20 cursor-pointer" onClick={() => router.post('/admin/applicant/update-status', {
                            id: data.id,
                            status: 'A'
                        })}>
                            <span className="flex items-center gap-2">
                                <CircleCheck />
                                Approve
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant={'destructive'} className="cursor-pointer" onClick={() => router.post('/admin/applicant/update-status', {
                            id: data.id,
                            status: 'R'
                        })}>
                            <span className="flex items-center gap-2">
                                <CircleX />
                                Reject
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            ) :
                null


        ];
    });

    return (
        <AccordionItem value={title.toLowerCase()}>
            <AccordionTrigger className="hover:no-underline! group">
                <h2 className={`text-lg font-bold mb-3 group-hover:scale-110 ${title === 'Pending' ? `text-yellow-600` : title === 'Rejected' ? 'text-red-600' : 'text-green-600'}`}>{title}</h2>
            </AccordionTrigger>
            <AccordionContent>
                <DataTable data={tableData} header={header} />
                <div className="py-3 flex items-center justify-end">
                    <AppPagination
                        links={dataset.links}
                        currentPage={dataset.current_page}
                        lastPage={dataset.last_page}
                    />
                </div>
            </AccordionContent>
        </AccordionItem >
    );
}
