import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import department from "@/routes/department";
import { Department } from "@/types/department";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function DialogDepartment({
    department,
    onClose,
}: {
    department?: Department | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: department?.name ?? ''
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()

        const opts = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(department ? '1 department updated successfully.' : '1 department added successfully.')
                reset()
                onClose()
            },
            onError: () => {
                toast.error('Failed to add department')
            }
        }

        if (department) {
            put(`/admin/department/${department.id}`, opts)
        }

        post('/admin/department', opts)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mb-2">{department ? 'Edit Department' : 'Add Department'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
                <FieldGroup>
                    <Field>
                        <Label htmlFor="name">Department Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            min={1}
                            placeholder="ex: Accounting"
                        />
                        {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={processing}>
                        {processing ?? <Loader2 className="size-4 animate-spin" />} {department ? 'Update' : 'Create'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
