# Student Management System API

A secure RESTful API for managing students with JWT authentication, built with ASP.NET Core 8.0 and ADO.NET with Stored Procedures.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **CRUD Operations** - Complete student management (Create, Read, Update, Delete)
- **Stored Procedures** - All database operations use stored procedures
- **Global Exception Handling** - Centralized error handling middleware
- **Structured Logging** - Serilog for file and console logging
- **Swagger Documentation** - Interactive API documentation
- **CORS Enabled** - Cross-origin requests allowed for React frontend

## 📋 Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (2019 or later)
- [Git](https://git-scm.com/)

## 🗄️ Database Setup

### 1. Create Database and Stored Procedures

Execute the following SQL script in SQL Server Management Studio:

```sql
-- Create Database
CREATE DATABASE StudentManagementDB;
GO

USE StudentManagementDB;
GO

-- Create Students Table
CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Age INT NOT NULL,
    Course NVARCHAR(50) NOT NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Get All Students
CREATE PROCEDURE sp_GetAllStudents
AS
BEGIN
    SELECT Id, Name, Email, Age, Course, CreatedDate 
    FROM Students ORDER BY Id DESC;
END
GO

-- Get Student By ID
CREATE PROCEDURE sp_GetStudentById @Id INT
AS
BEGIN
    SELECT Id, Name, Email, Age, Course, CreatedDate 
    FROM Students WHERE Id = @Id;
END
GO

-- Create Student
CREATE PROCEDURE sp_CreateStudent
    @Name NVARCHAR(100), @Email NVARCHAR(100), @Age INT, @Course NVARCHAR(50)
AS
BEGIN
    INSERT INTO Students (Name, Email, Age, Course, CreatedDate)
    VALUES (@Name, @Email, @Age, @Course, GETDATE());
    SELECT SCOPE_IDENTITY() AS Id;
END
GO

-- Update Student
CREATE PROCEDURE sp_UpdateStudent
    @Id INT, @Name NVARCHAR(100), @Email NVARCHAR(100), @Age INT, @Course NVARCHAR(50)
AS
BEGIN
    UPDATE Students SET Name=@Name, Email=@Email, Age=@Age, Course=@Course
    WHERE Id=@Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- Delete Student
CREATE PROCEDURE sp_DeleteStudent @Id INT
AS
BEGIN
    DELETE FROM Students WHERE Id=@Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- Check Email Exists
CREATE PROCEDURE sp_CheckEmailExists @Email NVARCHAR(100), @ExcludeId INT = NULL
AS
BEGIN
    IF @ExcludeId IS NULL
        SELECT COUNT(1) FROM Students WHERE Email=@Email;
    ELSE
        SELECT COUNT(1) FROM Students WHERE Email=@Email AND Id!=@ExcludeId;
END
GO

-------------------------------------

The API will be available at:

<<<<<<< HEAD
To learn React, check out the [React documentation](https://reactjs.org/).



---

## 📄 FRONTEND README (student-management-ui/README.md)


# Student Management System - React Frontend

A modern, responsive React application for managing students with JWT authentication, beautiful UI animations, and real-time data management.

## ✨ Features

- **JWT Authentication** - Secure login with token storage
- **Student Management** - Complete CRUD operations
- **Modern UI Design** - Glassmorphism with smooth animations
- **Dashboard Analytics** - Visual statistics and metrics
- **Search & Filter** - Real-time student filtering
- **Responsive Design** - Works on all devices
- **Form Validation** - Client-side validation with error messages
- **Toast Notifications** - Beautiful feedback messages
- **Protected Routes** - Role-based access control

## 🎨 UI Components

- Animated login page with particle background
- Glass card design with hover effects
- Responsive navigation bar
- Student cards with action buttons
- Modal forms with animations
- Loading spinners and skeletons
- Dashboard with statistics cards
- Search bar and course filter

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v9 or later)
- Backend API running on `https://localhost:7096`

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-management-ui

student-management-ui/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.tsx                 # Login page component
│   │   ├── Layout/
│   │   │   ├── Navbar.tsx                # Navigation bar
│   │   │   ├── Layout.tsx                # Main layout wrapper
│   │   │   └── PrivateRoute.tsx          # Protected route guard
│   │   ├── Students/
│   │   │   ├── StudentList.tsx           # Student grid/list view
│   │   │   ├── StudentCard.tsx           # Individual student card
│   │   │   └── StudentModal.tsx          # Add/Edit modal
│   │   └── Common/
│   │       ├── LoadingSpinner.tsx        # Loading indicator
│   │       └── ErrorAlert.tsx            # Error message component
│   ├── pages/
│   │   ├── Dashboard.tsx                 # Dashboard page
│   │   ├── StudentsPage.tsx              # Students page
│   │   └── LoginPage.tsx                 # Login page
│   ├── services/
│   │   ├── api.ts                        # Axios configuration
│   │   ├── authService.ts                # Authentication service
│   │   └── studentService.ts             # Student API service
│   ├── contexts/
│   │   └── AuthContext.tsx               # Auth context provider
│   ├── types/
│   │   └── index.ts                      # TypeScript interfaces
│   ├── App.tsx                           # Main app component
│   ├── index.tsx                         # Entry point
│   └── index.css                         # Global styles
├── public/
├── package.json
├── tailwind.config.js                     # Tailwind CSS config
└── tsconfig.json                         # TypeScript config

🔐 Authentication Flow
 1. User enters credentials on login page

 2. Credentials sent to backend API

 3. On success, JWT token stored in localStorage

 4. Token automatically added to all subsequent requests

 5. Token checked on protected routes

 6. On logout, token removed from localStorage


 LoginCredentials

Username: admin

Password: password

Test Flow
Open http://localhost:3000

Login with above credentials

View dashboard statistics

Navigate to Students page

Add a new student

Edit an existing student

Delete a student

Test search and filter

Logout

🎨Styling & Design

Color Scheme
Primary: Blue to Purple gradient (from-blue-500 to-purple-600)

Secondary: Gray shades for text and borders

Success: Green (text-green-500)

Error: Red (bg-red-500)

Animations
Framer Motion for smooth transitions

Hover effects on cards and buttons

Modal popup animations

Loading spinner animations

Page transition effects

Icons
React Icons library

Heroicons for consistent design

Custom SVG icons where needed

📱ResponsiveDesign

Desktop: Full layout with sidebars

Tablet: Adjusted grid layouts

Mobile: Stacked layout with hamburger menu

Breakpoints: Tailwind default (sm: 640px, md: 768px, lg: 1024px)
=======
HTTPS: https://localhost:7096

HTTP: http://localhost:5075

Swagger UI: https://localhost:7096/swagger

📚 API Endpoints
Authentication (No token required)
Method	Endpoint	Description
POST	/api/Auth/login	User login
Student Management (Bearer token required)

Method	    Endpoint	        Description
GET	      /api/Students	        Get all students
GET	      /api/Students/{id}	Get student by ID
POST	 /api/Students	        Create new student
PUT	     /api/Students/{id}  	Update student
DELETE	/api/Students/{id}	    Delete student


🔐 Authentication
Default Credentials

Username: admin
Password: password


---------------------------------------------------------------------------------------

StudentManagementSystem.API/
├── Controllers/
│   ├── AuthController.cs          # Authentication endpoints
│   └── StudentsController.cs      # Student CRUD endpoints
├── Services/
│   ├── AuthService.cs              # JWT token generation
│   └── StudentService.cs           # Business logic
├── Middleware/
│   └── ExceptionMiddleware.cs      # Global error handling
├── Helpers/
│   └── DatabaseHelper.cs           # ADO.NET database operations
├── Models/
│   ├── Student.cs                  # Student entity
│   ├── StudentDto.cs               # Data transfer objects
│   └── ApiResponse.cs              # Standard API response
├── Program.cs                       # Application entry point
└── appsettings.json                 # Configuration


----------------------------------------------------------------------------------------------------------------------------

🛠️ Technologies Used
ASP.NET Core 8.0 - Web API framework

ADO.NET - Data access technology

SQL Server - Database

JWT - Authentication

Serilog - Logging

Swagger - API documentation



🔒 Security Features
JWT Bearer authentication

Password hashing (extendable)

Email uniqueness validation

SQL injection prevention via stored procedures

CORS policy for specific origins
>>>>>>> 260e63e5860b296c7c1536d8d00b640b2274ae18
