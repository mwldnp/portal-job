import { User } from "./auth";

export interface Applicant {
    id: number;
    user_id: number;
    vacancy_id: number;
    name: string;
    gender: string;
    dob: string;
    address: string;
    no_telp: string;
    university: string;
    major: string;
    ipk: number;
    path_cv: string;
    user: User;
}
