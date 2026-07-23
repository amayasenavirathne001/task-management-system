# Task Management System

A full-stack Task Management System built using **React**, **Node.js**, **Express.js**, and **PostgreSQL**. The application allows users to securely manage their daily tasks with authentication, task tracking, filtering, and dashboard statistics.

---

## 🚀 Features

### Authentication
- Secure login using JWT (JSON Web Token)
- Password encryption using bcrypt
- Protected API routes
- Protected frontend routes

### Task Management
- Create new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Search tasks by title
- Filter tasks by status
- Filter tasks by priority
- Sort tasks by creation date or due date

### Dashboard
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overdue Tasks

---

## 🛠 Technologies Used

### Frontend
- React
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs

### Database
- PostgreSQL

---

## 📁 Project Structure

```
task-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-management-system.git
cd task-management-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_management

JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🗄 Database

Create a PostgreSQL database named:

```
task_management
```

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20),
    status VARCHAR(30),
    due_date DATE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/create-admin` | Create default admin (run once) |

---

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/stats` | Dashboard statistics |

---

## 🔍 Search & Filtering

Supports query parameters:

```
GET /api/tasks?search=meeting
```

```
GET /api/tasks?status=Pending
```

```
GET /api/tasks?priority=High
```

```
GET /api/tasks?sort=due_date
```

---

## 👤 Default Login

If using the sample admin account:

```
Email:
admin@test.com

Password:
123456
```

---


## 🔒 Security

- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- Protected frontend routes

---

## 🚧 Future Improvements

- User registration
- User profile management
- Task categories
- File attachments
- Email notifications
- Dark mode
- Pagination
- Responsive UI using Tailwind CSS
- Docker deployment

---

## 👨‍💻 Author

**Amaya**

Software Engineering Undergraduate

GitHub:
https://github.com/amayasenavirathne001




---

## 📄 License

This project is developed for educational purposes and technical assessment.