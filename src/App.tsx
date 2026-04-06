import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div>
                    <Toaster 
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#333',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                padding: '16px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/students"
                            element={
                                <PrivateRoute>
                                    <StudentsPage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;