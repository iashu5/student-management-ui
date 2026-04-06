export interface Student {
    id: number;
    name: string;
    email: string;
    age: number;
    course: string;
    createdDate: string;
}

export interface CreateStudentDto {
    name: string;
    email: string;
    age: number;
    course: string;
}

export interface UpdateStudentDto {
    name: string;
    email: string;
    age: number;
    course: string;
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    message: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error: string | null;
}

export interface User {
    username: string;
    token: string;
}