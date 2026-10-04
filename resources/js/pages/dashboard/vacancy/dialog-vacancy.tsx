import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Department } from "@/types/department";
import { Vacancy } from "@/types/vacancy";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function DialogVacancy({
    departments,
    vacancy,
    onClose
}: {
    departments: Department[];
    vacancy?: Vacancy | null
    onClose: () => void

}) {

    const { auth } = usePage().props

    const { data, setData, post, put, processing, errors, reset } = useForm({
        dept_id: vacancy?.dept_id?.toString() ?? '',
        position: vacancy?.position ?? '',
        quota: vacancy?.quota?.toString() ?? '0',
        description: vacancy?.description ?? '',
        user_create: vacancy?.user_create ?? auth.user.name,
        user_update: auth.user.name,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault()

        const opts = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(vacancy ? '1 job successfully updated.' : '1 job added successfully.')
                reset()
                onClose()
            },
            onError: () => {
                toast.error('Failed to create job vacancy')
            },
        }

        if (vacancy) {
            put(`/admin/vacancy/${vacancy.id}`, opts)
            return
        }

        post('/admin/vacancy', opts)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mb-2">{vacancy ? 'Edit Job' : 'Post a Job'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
                <FieldGroup>
                    <Field>
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            type="text"
                            placeholder="ex: Staff Accounting"
                        />
                        {errors.position && <p className="text-sm text-red-500 font-medium">{errors.position}</p>}
                    </Field>
                    <Field>
                        <Label>Department</Label>
                        <Select onValueChange={(value) => setData('dept_id', value)} value={data.dept_id.toString()}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Department</SelectLabel>
                                    {departments.map((department) => {
                                        return (
                                            <SelectItem
                                                key={department.id}
                                                value={String(
                                                    department.id,
                                                )}
                                            >
                                                {department.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.dept_id && <p className="text-sm text-red-500 font-medium">{errors.dept_id}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Job description"
                        />
                        {errors.description && <p className="text-sm text-red-500 font-medium">{errors.description}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="quota">Quota</Label>
                        <Input
                            id="quota"
                            value={data.quota}
                            onChange={(e) => setData('quota', e.target.value)}
                            type="number"
                            min={1}
                            placeholder="Number of available slots"
                        />
                        {errors.quota && <p className="text-sm text-red-500 font-medium">{errors.quota}</p>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={processing}>
                        {processing ?? <Loader2 className="size-4 animate-spin" />} {vacancy ? 'Update' : 'Create'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
