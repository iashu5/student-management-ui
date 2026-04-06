
To learn React, check out the [React documentation](https://reactjs.org/).



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

