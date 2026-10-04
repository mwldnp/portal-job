import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function DialogCreeateDepartment() {

    const { data, setData, post, processing, errors } = useForm({
        name: ''
    });

    const handleCreateDepartment = (e: FormEvent) => {
        e.preventDefault()
        console.log(data);

        post('/admin/vacancy')
        document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();

    }

    return (
        <DialogContent>
            <form onSubmit={handleCreateDepartment}>
                <DialogHeader>
                    <DialogTitle className="mb-2">Create a Department</DialogTitle>
                </DialogHeader>

                <FieldGroup className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Department Name</FieldLabel>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            placeholder="ex: Accounting"
                            required
                        />
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={processing}>
                        {processing && <Loader2 className="size-4 animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}