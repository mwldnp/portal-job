import { DarkmodeToggle } from "@/components/custom/darkmode-toggle";
import { SignupForm } from "@/pages/auth/_components/signup-form";
import { Head } from "@inertiajs/react";

export default function SignupPage() {
    return (
        <>
            <Head title="Signup" />
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="p-4 absolute top-0 right-0">
                    <DarkmodeToggle />
                </div>
                <div className="w-full max-w-sm">
                    <SignupForm />
                </div>
            </div>
        </>
    )
}