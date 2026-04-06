import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="glass-morphism sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center space-x-2"
                    >
                        <FaGraduationCap className="text-3xl text-purple-600" />
                        <Link to="/" className="text-xl font-bold text-gray-800">
                            StudentManager
                        </Link>
                    </motion.div>

                
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                            Dashboard
                        </Link>
                        <Link to="/students" className="text-gray-700 hover:text-purple-600 transition-colors">
                            Students
                        </Link>
                        <div className="flex items-center space-x-3 border-l pl-6">
                            <FaUserCircle className="text-2xl text-purple-600" />
                            <span className="text-gray-700">Welcome, {user}</span>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </motion.button>
                        </div>
                    </div>

              
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

            
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden py-4 border-t"
                    >
                        <Link
                            to="/"
                            className="block py-2 text-gray-700 hover:text-purple-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/students"
                            className="block py-2 text-gray-700 hover:text-purple-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Students
                        </Link>
                        <div className="border-t mt-2 pt-2">
                            <div className="flex items-center space-x-2 py-2">
                                <FaUserCircle className="text-xl text-purple-600" />
                                <span className="text-gray-700">{user}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center mt-2"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;