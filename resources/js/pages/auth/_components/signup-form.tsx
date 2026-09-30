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
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Head, useForm, usePage } from "@inertiajs/react"
import { Loader2 } from "lucide-react"
import { FormEvent, useEffect } from "react"
import { toast, Toaster } from "sonner"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post('/signup')
    }

    return (
        <>
            <Toaster closeButton position="top-center" />
            <Head title="Sign Up" />
            <Card {...props}>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input id="name" type="text" placeholder="John Doe" required value={data.name} onChange={e => setData('name', e.target.value)} />
                                <FieldError>{errors.name}</FieldError>
                            </Field>
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
                                <FieldDescription>
                                    We&apos;ll use this to contact you. We will not share your email
                                    with anyone else.
                                </FieldDescription>
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" type="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">
                                    Confirm Password
                                </FieldLabel>
                                <Input id="confirm-password" type="password" required value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                                <FieldDescription>Please confirm your password.</FieldDescription>
                            </Field>
                            <FieldGroup>
                                <Field>
                                    <Button type="submit">{processing ? <Loader2 className="animate-spin" /> : ''} Create Account</Button>

                                    <FieldDescription className="px-6 text-center">
                                        Already have an account? <a href="/login">Sign in</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card >
        </>
    )
}
