# HMCTS Task Manager - Caseworker Digital Service

A full-stack task management system for HMCTS caseworkers to efficiently manage their tasks and streamline court administration processes.

## 🏛️ Project Overview

This application provides a complete solution for caseworkers to:
- Create and manage tasks with titles, descriptions, and due dates
- Update task statuses (TODO, IN_PROGRESS, COMPLETED)
- View all tasks in a user-friendly interface
- Delete tasks when no longer needed

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (for backend)
- **Node.js 16+** (for frontend)
- **Docker** (for database)
- **Git**

### One-Command Setup
```bash
# 1. TO FOLOW THS GUIDE YOU SHOULD START AT THE ROOT OF THE FOLDER
 cd \..\dts-developer-challenge

# 2. cd to backend and run docker - the docker service runs the database and is only in the backend 
 cd backend/task-manager && docker-compose up -d

# 3. Start the backend (new terminal)
 && ./gradlew bootRun

# 4. Start the frontend (new terminal)
cd frontend/task-manager-ui && npm install && npm start
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **API Documentation:** http://localhost:8080/swagger-ui.html

## 🏗️ Architecture

### Backend (Spring Boot)
```
backend/task-manager/
├── src/main/java/uk/gov/hmcts/dts/taskmanager/
│   ├── controller/     # REST API endpoints
│   ├── service/        # Business logic
│   ├── repository/     # Data access layer
│   ├── model/          # Entity classes
│   └── exception/      # Error handling
├── src/main/resources/
│   ├── application.properties
│   └── db/changelog/   # Liquibase migrations
└── src/test/          # Unit tests
```

### Frontend (React TypeScript)
```
frontend/task-manager-ui/
├── src/
│   ├── tests/          # Test folder
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API integration
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utility functions
└── public/            # Static assets
```

## 📋 Features

### ✅ Backend API
- **Create Task:** `POST /api/tasks`
- **Get All Tasks:** `GET /api/tasks`
- **Get Task by ID:** `GET /api/tasks/{id}`
- **Update Task Status:** `PATCH /api/tasks/{id}/status`
- **Delete Task:** `DELETE /api/tasks/{id}`

### ✅ Frontend Application
- **Dashboard:** Overview with task statistics
- **Task Management:** Create, view, update status, and delete tasks
- **Search & Filter:** Find tasks by title/description and filter by status
- **Responsive Design:** Works on desktop and mobile devices
- **Professional UI:** Government Design System compliant

### ✅ Technical Features
- **Database:** PostgreSQL with Liquibase migrations
- **API Documentation:** Swagger/OpenAPI 3
- **Error Handling:** Global exception handling with proper HTTP status codes
- **Validation:** Input validation on both frontend and backend
- **Testing:** Comprehensive unit tests for service layer
- **Type Safety:** Full TypeScript implementation
- **Responsive Design:** Mobile-first approach with Tailwind CSS

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Backend** | Java Spring Boot | 3.5.3 |
| **Frontend** | React TypeScript | 18.2.0 |
| **Database** | PostgreSQL | 15 |
| **Migrations** | Liquibase | 4.31.1 |
| **Styling** | Tailwind CSS | 3.3.0 |
| **API Client** | Axios | 1.6.0 |
| **Documentation** | Swagger/OpenAPI | 3 |
| **Testing** | JUnit 5, Mockito | Latest |
| **Build Tool** | Gradle | 8.x |
| **Package Manager** | npm | Latest |

## 🔧 Development Setup

### Backend Setup
```bash
cd backend/task-manager

# Start PostgreSQL
docker-compose up -d

# Run application
./gradlew bootRun

# Run tests
./gradlew test

# Build application
./gradlew build
```

### Frontend Setup
```bash
cd frontend/task-manager-ui

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Database Setup
```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# View database logs
docker-compose logs postgres

# Connect to database (optional)
docker exec -it taskmanager-db psql -U taskmanager -d taskmanager
```

## 🧪 Testing

### Backend Tests
```bash
cd backend/task-manager
./gradlew test
```

**Test Coverage:**
- ✅ Service layer unit tests with Mockito
- ✅ Repository integration tests
- ✅ Exception handling tests
- ✅ Validation tests

### Frontend Tests
```bash
cd frontend/task-manager-ui
npm test
```

## 📚 API Documentation

### Swagger UI
Visit http://localhost:8080/swagger-ui.html for interactive API documentation.

### API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/tasks` | Create a new task | `CreateTaskRequest` |
| `GET` | `/api/tasks` | Get all tasks | - |
| `GET` | `/api/tasks/{id}` | Get task by ID | - |
| `PATCH` | `/api/tasks/{id}/status` | Update task status | `?status=STATUS` |
| `DELETE` | `/api/tasks/{id}` | Delete task | - |

### Data Models

**Task:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "TODO | IN_PROGRESS | COMPLETED",
  "dueDate": "2025-01-20T10:00:00",
  "createdAt": "2025-01-15T09:00:00",
  "updatedAt": "2025-01-15T09:00:00"
}
```

## 🐳 Docker Support

### Database Only (Recommended)
```bash
docker-compose up -d
```


## 🔒 Security & Validation

- **Input Validation:** Bean validation on API requests
- **Error Handling:** Proper HTTP status codes and error messages
- **CORS:** Configured for frontend-backend communication
- **SQL Injection Prevention:** JPA/Hibernate parameter binding
- **XSS Prevention:** React's built-in protection

## 🎨 Design System

The application follows the **Government Design System** with:
- HMCTS branding and colors
- Accessible design patterns
- Responsive layout for all devices
- Professional government service appearance

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

### Code Style
- **Backend:** Java conventions with Google Java Style
- **Frontend:** ESLint + Prettier configuration
- **Database:** Snake_case naming convention

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Run full test suite
4. Submit pull request


## 📄 License

This project is developed for HMCTS technical assessment purposes.

---

**Built with ❤️ for HMCTS Caseworkers and my interview**