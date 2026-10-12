import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Vacancy } from "@/types/vacancy";
import { useForm } from "@inertiajs/react";
import { ArrowLeft, Building2, Loader2, User2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function SheetApplicant({
    vacancy,
    onClose
}: {
    vacancy: Vacancy | null,
    onClose: () => void
}) {

    const user = useAuthUser()

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        vacancy_id: vacancy?.id,
        name: '',
        gender: '',
        dob: '',
        address: '',
        no_telp: '',
        university: '',
        major: '',
        ipk: '',
        path_cv: null as File | null,
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()

        const opts = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Application submitted!', {
                    description: 'You’re one step closer to your next opportunity.'
                })
                reset()
                onClose()
            },
            onError: () => {
                toast.error('Something went wrong while submitting your application.')
            },
        }

        post('/applicant', opts)

    }

    return (
        <SheetContent style={{ maxWidth: '65vw' }} className="p-8 " side="right">
            <SheetHeader className="p-0 pb-4 border-b mb-3">
                <SheetTitle className="text-lg">Applying for a job in <span className="font-bold">{vacancy?.position}</span></SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-2 gap-6 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <h2 className="flex items-center gap-2 text-xl">
                        <SheetClose>
                            <ArrowLeft />
                        </SheetClose>
                        {vacancy?.position}
                    </h2>
                    <div className="space-y-2">
                        <h3 className="text-lg">Job Description</h3>
                        <p>{vacancy?.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-5 border p-4 rounded-lg">
                            <Building2 />
                            <div className="flex flex-col gap-1">
                                <h3>Department</h3>
                                <h4 className="text-lg font-semibold">{vacancy?.department.name}</h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 border p-3 rounded-lg">
                            <User2 />
                            <div className="flex flex-col gap-1">
                                <h3>Quota</h3>
                                <h4 className="text-lg font-semibold">{vacancy?.quota}</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <form onSubmit={submit} className="px-4 space-y-4 no-scrollbar overflow-y-auto">
                    <h3 className="font-bold text-xl pb-2">Apply for this job</h3>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Full Name<span className="text-destructive">*</span></Label>
                            <Input
                                id="name"

                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                min={1}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label>Gender<span className="text-destructive">*</span></Label>
                                <Select onValueChange={(value) => setData('gender', value)} value={data.gender.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Female
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-sm text-red-500 font-medium">{errors.gender}</p>}
                            </Field>
                            <Field>
                                <Label htmlFor="dob">Date of Birth<span className="text-destructive">*</span></Label>
                                <Input
                                    id="dob"

                                    onChange={(e) => setData('dob', e.target.value)}
                                    type="date"
                                />
                                {errors.dob && <p className="text-sm text-red-500 font-medium">{errors.dob}</p>}
                            </Field>
                        </div>
                        <Field>
                            <Label htmlFor="address">Address<span className="text-destructive">*</span></Label>
                            <Textarea
                                id="address"

                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Your address"
                            />
                            {errors.address && <p className="text-sm text-red-500 font-medium">{errors.address}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="no_telp">Phone Number<span className="text-destructive">*</span></Label>
                            <Input
                                id="no_telp"

                                onChange={(e) => setData('no_telp', e.target.value)}
                                type="number"
                                placeholder="0856 **** ****"
                            />
                            {errors.no_telp && <p className="text-sm text-red-500 font-medium">{errors.no_telp}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="university">University<span className="text-destructive">*</span></Label>
                            <Input
                                id="university"
                                onChange={(e) => setData('university', e.target.value)}
                                type="text"
                                placeholder="University name"
                            />
                            {errors.university && <p className="text-sm text-red-500 font-medium">{errors.university}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="major">Major<span className="text-destructive">*</span></Label>
                            <Input
                                id="major"
                                onChange={(e) => setData('major', e.target.value)}
                                type="text"
                                placeholder="Your major or specialization"
                            />
                            {errors.major && <p className="text-sm text-red-500 font-medium">{errors.major}</p>}
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="ipk">IPK<span className="text-destructive">*</span></Label>
                                <Input
                                    id="ipk"
                                    onChange={(e) => setData('ipk', e.target.value)}
                                    type="number"
                                    placeholder="0.00 - 4.00"
                                    min={0.00}
                                    max={4.00}
                                    step={0.01}
                                />
                                {errors.ipk && <p className="text-sm text-red-500 font-medium">{errors.ipk}</p>}
                            </Field>
                            <Field>
                                <Label htmlFor="path_cv">Upload your CV<span className="text-destructive">*</span></Label>
                                <Input
                                    id="path_cv"
                                    onChange={(e) => setData('path_cv', e.target.files?.[0] ?? null)}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                />
                                {errors.path_cv && <p className="text-sm text-red-500 font-medium">{errors.path_cv}</p>}
                            </Field>
                        </div>
                    </FieldGroup>

                    <Button type="submit" disabled={processing}>
                        {processing ?? <Loader2 className="size-4 animate-spin" />} Apply
                    </Button>
                </form>
            </div>
        </SheetContent>
    )
}