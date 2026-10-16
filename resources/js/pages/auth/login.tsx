import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Head, useForm, usePage } from "@inertiajs/react"
import React, { FormEvent, useEffect } from "react"
import { toast, Toaster } from "sonner"
import { BriefcaseBusiness, Loader2 } from "lucide-react"
import GuestLayout from "@/layouts/guest-layout"

export default function Login({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        email: '',
        password: ''
    })

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post('/login')
    }

    useEffect(() => {
        if (errors.email || errors.password) {
            toast.error('Email atau Password salah!')
        }
    }, [errors])

    return (
        <>
            <Toaster closeButton position="top-center" />
            <Head title="Login" />
            <div className={cn("flex flex-col gap-12", className)} {...props}>
                <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-secondary">
                        <BriefcaseBusiness className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        <span className="text-primary">Karir</span>Ku
                    </h1>
                </div>

                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                </Field>
                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                    </div>
                                    <Input id="password" type="password" required placeholder="********" value={data.password}
                                        onChange={e => setData('password', e.target.value)} />
                                </Field>
                                <Field>
                                    <Button type="submit">{processing ? <Loader2 className="animate-spin" /> : ''} Login</Button>
                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account? <a href="/signup">Sign up</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

Login.layout = (page: React.ReactNode) => <GuestLayout children={page} />