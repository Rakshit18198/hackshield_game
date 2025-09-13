# HackShield Frontend

A modern React-based frontend for the HackShield cybersecurity education platform. This application provides an interactive interface for users to learn about cybersecurity through various mini-games and challenges.

## Features

- **User Authentication**: Secure login and signup functionality
- **Dashboard**: Overview of user progress and available games
- **Interactive Games**: Multiple question types including MCQ, True/False, and Fill-in-the-Blank
- **Real-time Scoring**: Live score tracking and progress monitoring
- **Responsive Design**: Modern UI that works on all devices
- **Progress Tracking**: Detailed statistics and achievement system

## Tech Stack

- **React 19**: Latest React with hooks and modern patterns
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd hackshield-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Login component
│   │   ├── Signup.jsx         # Registration component
│   │   └── ProtectedRoute.jsx # Authentication wrapper
│   ├── Dashboard/
│   │   └── Dashboard.jsx      # Main dashboard
│   └── Game/
│       └── Game.jsx           # Game interface
├── utils/
│   └── api.js                 # API configuration
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## Components Overview

### Authentication Components

- **Login**: User login form with email and password
- **Signup**: User registration with name, email, and password
- **ProtectedRoute**: Wrapper component that checks authentication status

### Dashboard Component

- Displays user statistics and progress
- Shows available games with difficulty levels
- Provides navigation to individual games
- Includes logout functionality

### Game Component

- Handles different question types (MCQ, True/False, Fill-in-the-Blank)
- Real-time timer functionality
- Score tracking and progress indicators
- Game completion and results display

## API Integration

The frontend communicates with the backend through a centralized API configuration (`src/utils/api.js`) that includes:

- Automatic token management
- Request/response interceptors
- Error handling for authentication failures
- Base URL configuration

### API Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /games` - Get available games
- `GET /games/:id` - Get specific game details
- `POST /games/:id/start` - Start a game session
- `POST /games/:id/answer` - Submit an answer
- `POST /games/:id/complete` - Complete a game session
- `GET /games/dashboard/stats` - Get user statistics

## Styling

The application uses Tailwind CSS with custom components and utilities:

- **Custom Colors**: Primary and secondary color schemes
- **Component Classes**: Reusable button, input, and card styles
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory

3. Deploy the contents of `dist/` to your web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the HackShield cybersecurity education platform.
