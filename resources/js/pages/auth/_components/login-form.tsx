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
import { FormEvent, useEffect } from "react"
import { toast, Toaster } from "sonner"
import { Loader2 } from "lucide-react"

export function LoginForm({
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
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
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
                                    <Input id="password" type="password" required value={data.password}
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
