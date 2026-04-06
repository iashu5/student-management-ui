import api from './api';
import { Student, CreateStudentDto, UpdateStudentDto, ApiResponse } from '../types';

class StudentService {
    async getAllStudents(): Promise<Student[]> {
        try {
            const response = await api.get<ApiResponse<Student[]>>('/api/Students');
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch students');
        }
    }

    async getStudentById(id: number): Promise<Student> {
        try {
            const response = await api.get<ApiResponse<Student>>(`/api/Students/${id}`);
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch student');
        }
    }

    async createStudent(student: CreateStudentDto): Promise<Student> {
        try {
            const response = await api.post<ApiResponse<Student>>('/api/Students', student);
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to create student');
        }
    }

    async updateStudent(id: number, student: UpdateStudentDto): Promise<Student> {
        try {
            const response = await api.put<ApiResponse<Student>>(`/api/Students/${id}`, student);
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update student');
        }
    }

    async deleteStudent(id: number): Promise<void> {
        try {
            await api.delete<ApiResponse<null>>(`/api/Students/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to delete student');
        }
    }
}

export default new StudentService();