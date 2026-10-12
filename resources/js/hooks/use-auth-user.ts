import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import { User } from "@/types/auth";

export interface CustomPageProps extends PageProps {
    auth: {
        user: User | null;
    };
}

export function useAuthUser() {
    const { auth } = usePage<CustomPageProps>().props;
    return auth.user;
}
