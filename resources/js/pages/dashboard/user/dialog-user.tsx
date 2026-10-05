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
import { User } from "@/types";
import { Department } from "@/types/department";
import { Vacancy } from "@/types/vacancy";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function DialogUser({
    user,
    onClose
}: {
    user?: User | null
    onClose: () => void

}) {

    const { auth } = usePage().props

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name ?? '0',
        email: user?.email ?? '',
        role: user?.role ?? '',
        password: user?.password ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault()

        const opts = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(user ? '1 user updated successfully.' : '1 user added successfully.')
                reset()
                onClose()
            },
            onError: () => {
                toast.error('Failed to add user')
            },
        }

        if (user) {
            put(`/admin/user/${user.id}`, opts)
            return
        }

        post('/admin/vacancy', opts)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mb-2">{user ? 'Edit User' : 'Add a user'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
                <FieldGroup>
                    <Field>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            placeholder="m@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                    </Field>
                    <Field>
                        <Label>Role</Label>
                        <Select onValueChange={(value) => setData('role', value)} value={data.role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>User Role</SelectLabel>
                                    <SelectItem
                                        key='admin'
                                        value={'admin'}
                                    >
                                        Admin
                                    </SelectItem>
                                    <SelectItem
                                        key='guest'
                                        value={'guest'}
                                    >
                                        Guest
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-red-500 font-medium">{errors.role}</p>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={processing}>
                        {processing ?? <Loader2 className="size-4 animate-spin" />} {user ? 'Update' : 'Create'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
