import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaUser, FaEnvelope, FaBirthdayCake, FaBook } from 'react-icons/fa';
import { Student, CreateStudentDto } from '../../types';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateStudentDto) => Promise<void>;
    student?: Student | null;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSubmit, student }) => {
    const [formData, setFormData] = useState<CreateStudentDto>({
        name: '',
        email: '',
        age: 0,
        course: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof CreateStudentDto, string>>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                email: student.email,
                age: student.age,
                course: student.course,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                age: 0,
                course: '',
            });
        }
        // Clear errors when modal opens/closes
        setErrors({});
    }, [student, isOpen]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CreateStudentDto, string>> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (formData.age < 1 || formData.age > 120) newErrors.age = 'Age must be between 1 and 120';
        if (!formData.course.trim()) newErrors.course = 'Course is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        setSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value,
        }));
       
        if (errors[name as keyof CreateStudentDto]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
           
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
          
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
                   
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-2xl font-bold text-gray-800">
                            {student ? 'Edit Student' : 'Add New Student'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>

                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                <FaUser className="inline mr-2 text-purple-500" /> Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter student name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                <FaEnvelope className="inline mr-2 text-purple-500" /> Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter email address"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                <FaBirthdayCake className="inline mr-2 text-purple-500" /> Age *
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter age"
                                min="1"
                                max="120"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                <FaBook className="inline mr-2 text-purple-500" /> Course *
                            </label>
                            <input
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter course name"
                            />
                            {errors.course && (
                                <p className="text-red-500 text-xs mt-1">{errors.course}</p>
                            )}
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
                            >
                                {submitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" /> Save
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentModal;