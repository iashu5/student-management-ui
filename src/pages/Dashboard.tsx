import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserPlus,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";
import studentService from "../services/studentService";
import { Student } from "../types";

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: FaUsers,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Active Courses",
      value: Array.from(new Set(students.map((s) => s.course))).length,
      icon: FaGraduationCap,
      color: "from-purple-500 to-pink-500",
      change: "+5%",
    },
    {
      title: "Average Age",
      value:
        students.length > 0
          ? Math.round(
              students.reduce((sum, s) => sum + s.age, 0) / students.length,
            )
          : 0,
      icon: FaChartLine,
      color: "from-green-500 to-emerald-500",
      change: "-2%",
    },
    {
      title: "New This Month",
      value: students.filter(
        (s) =>
          new Date(s.createdDate) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ).length,
      icon: FaUserPlus,
      color: "from-orange-500 to-red-500",
      change: "+18%",
    },
  ];

  const recentStudents = students.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-8">
      
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your students today.
          </p>
        </motion.div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <span className="text-green-500 text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Students
          </h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : recentStudents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students found</p>
          ) : (
            <div className="space-y-3">
              {recentStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-xs text-gray-400">Age: {student.age}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
