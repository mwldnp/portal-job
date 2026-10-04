import { Department } from "./department";

export interface Vacancy {
    id: number;
    dept_id: number;
    position: string;
    quota: number;
    description: string;
    user_create: string;
    user_update: string;
    created_at: string;
    updated_at: string;
    department: Department;
}
