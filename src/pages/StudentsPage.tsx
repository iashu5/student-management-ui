import React from 'react';
import Layout from '../components/Layout/Layout';
import StudentList from '../components/Students/StudentList';

const StudentsPage: React.FC = () => {
    return (
        <Layout>
            <StudentList />
        </Layout>
    );
};

export default StudentsPage;