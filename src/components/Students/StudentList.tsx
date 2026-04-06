import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import StudentModal from './StudentModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import studentService from '../../services/studentService';
import { Student, CreateStudentDto } from '../../types';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaUsers } from 'react-icons/fa';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCourse, setFilterCourse] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        filterStudents();
    }, [searchTerm, filterCourse, students]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await studentService.getAllStudents();
            setStudents(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterStudents = () => {
        let filtered = [...students];
        
        if (searchTerm) {
            filtered = filtered.filter(s => 
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filterCourse) {
            filtered = filtered.filter(s => s.course === filterCourse);
        }
        
        setFilteredStudents(filtered);
    };

    const handleCreate = async (data: CreateStudentDto) => {
        try {
            const newStudent = await studentService.createStudent(data);
            setStudents([newStudent, ...students]);
            toast.success('Student created successfully! 🎉');
        } catch (err: any) {
            toast.error(err.message);
            throw err;
        }
    };

    const handleUpdate = async (data: CreateStudentDto) => {
        if (!editingStudent) return;
        try {
            const updatedStudent = await studentService.updateStudent(editingStudent.id, data);
            setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
            setEditingStudent(null);
            toast.success('Student updated successfully! ✏️');
        } catch (err: any) {
            toast.error(err.message);
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await studentService.deleteStudent(id);
                setStudents(students.filter(s => s.id !== id));
                toast.success('Student deleted successfully! 🗑️');
            } catch (err: any) {
                toast.error(err.message);
            }
        }
    };

    const courses = Array.from(new Set(students.map(s => s.course)));

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} onClose={() => setError(null)} />;

    return (
        <div className="space-y-6">
      
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
                    <p className="text-gray-600 mt-1">Manage and organize your students</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center shadow-lg hover:shadow-xl transition-all"
                >
                    <FaPlus className="mr-2" /> Add New Student
                </motion.button>
            </div>

         
            <div className="glass-card p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="md:w-64 relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                        >
                            <option value="">All Courses</option>
                            {courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <p className="text-gray-600">Showing {filteredStudents.length} of {students.length} students</p>
            </div>

          
            {filteredStudents.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No students found</p>
                    <p className="text-gray-400">Click "Add New Student" to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map(student => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onEdit={(student) => {
                                setEditingStudent(student);
                                setShowModal(true);
                            }}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

           
            <StudentModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingStudent(null);
                }}
                onSubmit={editingStudent ? handleUpdate : handleCreate}
                student={editingStudent}
            />
        </div>
    );
};

export default StudentList;