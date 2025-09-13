# HackShield Backend Setup Guide

## Prerequisites

1. **PostgreSQL** installed and running
2. **Node.js** (v16 or higher)
3. **npm** or **yarn**

## Database Setup

1. **Create PostgreSQL Database:**
   ```sql
   CREATE DATABASE hackshield;
   CREATE USER hackshield_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE hackshield TO hackshield_user;
   ```

2. **Create .env file** in the backend root directory:
   ```env
   # Database Configuration
   DB_USER=hackshield_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_NAME=hackshield
   DB_PORT=5432

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run database migrations:**
   ```bash
   npm run migrate
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Games
- `GET /api/games` - Get all available games
- `GET /api/games/:gameId` - Get specific game with questions
- `POST /api/games/:gameId/start` - Start a new game session
- `POST /api/games/:gameId/answer` - Submit an answer
- `POST /api/games/:gameId/complete` - Complete a game session
- `GET /api/games/dashboard/stats` - Get user dashboard statistics

## Testing the API

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Get games (with auth token):**
   ```bash
   curl -X GET http://localhost:5000/api/games \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## Troubleshooting

- **Database connection errors**: Check your PostgreSQL service and .env configuration
- **Migration errors**: Ensure database exists and user has proper permissions
- **CORS errors**: Frontend should be running on http://localhost:5173
- **JWT errors**: Ensure JWT_SECRET is set in .env file 