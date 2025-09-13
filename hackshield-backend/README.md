# HackShield Backend - Cybersecurity Game Platform

A comprehensive backend system for a cybersecurity education platform featuring multiple mini-games with various question types, user progress tracking, and achievement systems.

## Database Architecture

### Core Tables

#### 1. `games` - Game Definitions
Stores different mini-games available in the platform.

```sql
- id: Primary key
- name: Game name (e.g., "Phishing Awareness")
- description: Game description
- category: Game category (phishing, password_security, social_engineering, etc.)
- difficulty_level: 1-5 scale
- is_active: Whether the game is available
- created_at, updated_at: Timestamps
```

#### 2. `questions` - Question Bank
Stores all questions for all games with support for multiple question types.

```sql
- id: Primary key
- game_id: Foreign key to games table
- question_text: The actual question
- question_type: mcq, true_false, fill_blank, drag_drop, scenario
- difficulty_level: 1-5 scale
- points: Points awarded for correct answer
- time_limit: Optional time limit in seconds
- order_index: Question order in the game
- is_active: Whether the question is active
```

#### 3. `question_options` - MCQ Options
Stores options for multiple choice questions.

```sql
- id: Primary key
- question_id: Foreign key to questions table
- option_text: The option text
- is_correct: Whether this option is correct
- order_index: Option order
- explanation: Explanation for why this option is correct/incorrect
```

#### 4. `correct_answers` - Non-MCQ Answers
Stores correct answers for non-MCQ questions with flexible matching.

```sql
- id: Primary key
- question_id: Foreign key to questions table
- answer_text: The correct answer
- is_case_sensitive: Whether case matters
- partial_match_allowed: Whether partial matches are accepted
```

#### 5. `user_game_sessions` - Game Sessions
Tracks individual game sessions for users.

```sql
- id: Primary key
- user_id: Foreign key to users table
- game_id: Foreign key to games table
- started_at: Session start time
- completed_at: Session completion time
- total_score: Final score achieved
- max_possible_score: Maximum possible score
- accuracy_percentage: Percentage of correct answers
- time_taken: Time taken in seconds
- status: in_progress, completed, abandoned
```

#### 6. `user_answers` - Individual Answers
Stores each user's answer to individual questions.

```sql
- id: Primary key
- session_id: Foreign key to user_game_sessions
- question_id: Foreign key to questions table
- user_answer: Text answer (for non-MCQ)
- selected_option_id: Selected option (for MCQ)
- is_correct: Whether the answer was correct
- points_earned: Points earned for this answer
- time_taken: Time taken for this question
```

#### 7. `user_statistics` - Aggregated Statistics
Stores aggregated performance data for each user per game.

```sql
- id: Primary key
- user_id: Foreign key to users table
- game_id: Foreign key to games table
- total_attempts: Total number of attempts
- total_completions: Total number of completions
- best_score: Highest score achieved
- average_score: Average score across all attempts
- best_time: Fastest completion time
- average_time: Average completion time
- total_questions_answered: Total questions answered
- correct_answers: Total correct answers
- accuracy_percentage: Overall accuracy percentage
- last_played_at: Last time the game was played
```

#### 8. `user_achievements` - Achievement System
Tracks user achievements and milestones.

```sql
- id: Primary key
- user_id: Foreign key to users table
- game_id: Foreign key to games table
- achievement_type: Type of achievement (first_completion, perfect_score, etc.)
- achievement_data: JSON data for the achievement
- earned_at: When the achievement was earned
```

## Question Types Supported

### 1. Multiple Choice (MCQ)
- Standard multiple choice questions with 4 options
- One correct answer per question
- Options stored in `question_options` table

### 2. True/False
- Simple true/false questions
- Correct answer stored in `correct_answers` table

### 3. Fill in the Blank
- Text input questions
- Supports case-sensitive and case-insensitive matching
- Supports partial matching
- Multiple correct answers possible

### 4. Drag and Drop
- Interactive drag and drop questions
- Structure defined in question text
- Correct sequence stored in `correct_answers`

### 5. Scenario-based
- Complex scenario questions
- Can combine multiple question types
- Detailed explanations and feedback

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

## Usage Examples

### Starting a Game Session

```javascript
// 1. Get available games
const games = await fetch('/api/games', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 2. Get specific game with questions
const game = await fetch('/api/games/1', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 3. Start a session
const session = await fetch('/api/games/1/start', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Submitting Answers

```javascript
// For MCQ questions
const answer = await fetch('/api/games/1/answer', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sessionId: session.id,
    questionId: 1,
    selectedOptionId: 2
  })
});

// For text-based questions
const answer = await fetch('/api/games/1/answer', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sessionId: session.id,
    questionId: 4,
    answer: "The domain uses a number instead of a letter"
  })
});
```

### Completing a Game

```javascript
const result = await fetch('/api/games/1/complete', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sessionId: session.id
  })
});

// Response includes:
// {
//   sessionId: 123,
//   totalScore: 85,
//   maxPossibleScore: 100,
//   correctAnswers: 8,
//   totalQuestions: 10,
//   accuracyPercentage: 80.0,
//   timeTaken: 300,
//   achievements: ["First Completion!"]
// }
```

### Dashboard Statistics

```javascript
const dashboard = await fetch('/api/games/dashboard/stats', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response includes:
// {
//   overall: {
//     games_played: 3,
//     total_attempts: 5,
//     total_completions: 4,
//     total_points: 320,
//     average_accuracy: 85.5
//   },
//   games: [
//     {
//       name: "Phishing Awareness",
//       category: "phishing",
//       best_score: 100,
//       average_score: 85.0,
//       total_attempts: 2,
//       total_completions: 2,
//       accuracy_percentage: 85.0,
//       last_played_at: "2024-01-15T10:30:00Z"
//     }
//   ],
//   achievements: [
//     {
//       achievement_type: "first_completion",
//       achievement_data: { score: 100, accuracy: 100 },
//       earned_at: "2024-01-15T10:30:00Z",
//       game_name: "Phishing Awareness"
//     }
//   ]
// }
```

## Sample Games Included

1. **Phishing Awareness** - Learn to identify phishing emails
2. **Password Panic** - Test password security knowledge
3. **Social Engineering Defense** - Recognize social engineering tactics
4. **Network Security Basics** - Understand network security concepts
5. **Data Protection Challenge** - Learn data privacy best practices

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=hackshield_db
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

3. Run migrations:
```bash
npm run migrate up
```

4. Start the server:
```bash
npm start
```

## Features

- **Flexible Question Types**: Support for MCQ, true/false, fill-in-blank, drag-drop, and scenario questions
- **Progress Tracking**: Comprehensive tracking of user performance across all games
- **Achievement System**: Automatic achievement unlocking based on performance
- **Dashboard Analytics**: Detailed statistics and progress visualization
- **Session Management**: Proper game session handling with start/complete states
- **Scalable Architecture**: Designed to easily add new games and question types

## Future Enhancements

- Leaderboards and competitive features
- Multiplayer game modes
- Custom game creation tools
- Advanced analytics and reporting
- Integration with learning management systems
- Mobile app support 