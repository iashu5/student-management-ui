import React from 'react';
import { Student } from '../../types';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaEnvelope, FaCalendarAlt, FaBook, FaEdit, FaTrash, FaBirthdayCake } from 'react-icons/fa';

interface StudentCardProps {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="glass-card overflow-hidden group"
        >
            <div className="relative">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    ID: {student.id}
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <FaUserGraduate className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                                <p className="text-gray-600 text-sm">{student.course}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center text-gray-600">
                            <FaEnvelope className="mr-3 text-purple-500" />
                            <span className="text-sm">{student.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaBirthdayCake className="mr-3 text-purple-500" />
                            <span className="text-sm">Age: {student.age} years</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaBook className="mr-3 text-purple-500" />
                            <span className="text-sm">Course: {student.course}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-3 text-purple-500" />
                            <span className="text-sm">
                                Joined: {new Date(student.createdDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-3 mt-6 pt-4 border-t">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(student)}
                            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
                        >
                            <FaEdit className="mr-2" /> Edit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDelete(student.id)}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                            <FaTrash className="mr-2" /> Delete
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StudentCard;