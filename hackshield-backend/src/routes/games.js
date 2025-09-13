const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all available games
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM games WHERE is_active = true ORDER BY difficulty_level, name'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific game with its questions
router.get('/:gameId', authenticateToken, async (req, res) => {
    const { gameId } = req.params;
    const userId = req.user.id;

    try {
        // Get game details
        const gameResult = await db.query(
            'SELECT * FROM games WHERE id = $1 AND is_active = true',
            [gameId]
        );

        if (gameResult.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        const game = gameResult.rows[0];

        // Get questions for the game
        const questionsResult = await db.query(
            `SELECT q.*, 
                    json_agg(
                        json_build_object(
                            'id', qo.id,
                            'option_text', qo.option_text,
                            'order_index', qo.order_index
                        ) ORDER BY qo.order_index
                    ) FILTER (WHERE qo.id IS NOT NULL) as options
             FROM questions q
             LEFT JOIN question_options qo ON q.id = qo.question_id
             WHERE q.game_id = $1 AND q.is_active = true
             GROUP BY q.id
             ORDER BY q.order_index`,
            [gameId]
        );

        // Get user's previous best score for this game
        const statsResult = await db.query(
            'SELECT best_score, total_attempts FROM user_statistics WHERE user_id = $1 AND game_id = $2',
            [userId, gameId]
        );

        const userStats = statsResult.rows[0] || { best_score: 0, total_attempts: 0 };

        res.json({
            game,
            questions: questionsResult.rows,
            userStats
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start a new game session
router.post('/:gameId/start', authenticateToken, async (req, res) => {
    const { gameId } = req.params;
    const userId = req.user.id;

    try {
        // Check if game exists and is active
        const gameResult = await db.query(
            'SELECT * FROM games WHERE id = $1 AND is_active = true',
            [gameId]
        );

        if (gameResult.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        // Get total possible score for this game
        const scoreResult = await db.query(
            'SELECT SUM(points) as max_score FROM questions WHERE game_id = $1 AND is_active = true',
            [gameId]
        );

        const maxScore = parseInt(scoreResult.rows[0].max_score) || 0;

        // Create new session
        const sessionResult = await db.query(
            `INSERT INTO user_game_sessions (user_id, game_id, max_possible_score, status)
             VALUES ($1, $2, $3, 'in_progress')
             RETURNING *`,
            [userId, gameId, maxScore]
        );

        res.status(201).json({
            session: sessionResult.rows[0],
            message: 'Game session started successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit an answer for a question
router.post('/:gameId/answer', authenticateToken, async (req, res) => {
    const { gameId } = req.params;
    const { sessionId, questionId, answer, selectedOptionId } = req.body;
    const userId = req.user.id;

    try {
        // Verify session belongs to user and is active
        const sessionResult = await db.query(
            'SELECT * FROM user_game_sessions WHERE id = $1 AND user_id = $2 AND game_id = $3 AND status = $4',
            [sessionId, userId, gameId, 'in_progress']
        );

        if (sessionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Invalid or inactive session' });
        }

        // Get question details
        const questionResult = await db.query(
            'SELECT * FROM questions WHERE id = $1 AND game_id = $2 AND is_active = true',
            [questionId, gameId]
        );

        if (questionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const question = questionResult.rows[0];
        let isCorrect = false;
        let pointsEarned = 0;

        // Check answer based on question type
        if (question.question_type === 'mcq') {
            // Check if selected option is correct
            const optionResult = await db.query(
                'SELECT is_correct FROM question_options WHERE id = $1 AND question_id = $2',
                [selectedOptionId, questionId]
            );

            if (optionResult.rows.length > 0) {
                isCorrect = optionResult.rows[0].is_correct;
                pointsEarned = isCorrect ? question.points : 0;
            }
        } else {
            // For non-MCQ questions, check against correct answers
            const correctAnswersResult = await db.query(
                'SELECT * FROM correct_answers WHERE question_id = $1',
                [questionId]
            );

            for (const correctAnswer of correctAnswersResult.rows) {
                let userAnswer = answer;
                let correctAnswerText = correctAnswer.answer_text;

                if (!correctAnswer.is_case_sensitive) {
                    userAnswer = userAnswer.toLowerCase();
                    correctAnswerText = correctAnswerText.toLowerCase();
                }

                if (correctAnswer.partial_match_allowed) {
                    if (userAnswer.includes(correctAnswerText) || correctAnswerText.includes(userAnswer)) {
                        isCorrect = true;
                        break;
                    }
                } else {
                    if (userAnswer === correctAnswerText) {
                        isCorrect = true;
                        break;
                    }
                }
            }

            pointsEarned = isCorrect ? question.points : 0;
        }

        // Save user answer
        await db.query(
            `INSERT INTO user_answers (session_id, question_id, user_answer, selected_option_id, is_correct, points_earned)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [sessionId, questionId, answer, selectedOptionId, isCorrect, pointsEarned]
        );

        res.json({
            isCorrect,
            pointsEarned,
            correctAnswer: isCorrect ? 'Correct!' : 'Incorrect. Try again!'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Complete a game session
router.post('/:gameId/complete', authenticateToken, async (req, res) => {
    const { gameId } = req.params;
    const { sessionId } = req.body;
    const userId = req.user.id;

    try {
        // Verify session belongs to user
        const sessionResult = await db.query(
            'SELECT * FROM user_game_sessions WHERE id = $1 AND user_id = $2 AND game_id = $3',
            [sessionId, userId, gameId]
        );

        if (sessionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const session = sessionResult.rows[0];

        // Calculate final score and statistics
        const answersResult = await db.query(
            `SELECT 
                COUNT(*) as total_questions,
                SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
                SUM(points_earned) as total_score
             FROM user_answers 
             WHERE session_id = $1`,
            [sessionId]
        );

        const stats = answersResult.rows[0];
        const totalScore = stats.total_score || 0;
        const totalQuestions = stats.total_questions || 0;
        const correctAnswers = stats.correct_answers || 0;
        const accuracyPercentage = stats.total_questions > 0 
            ? (stats.correct_answers / stats.total_questions) * 100 
            : 0;

        // Update session with completion data
        const timeTaken = Math.floor((new Date() - new Date(session.started_at)) / 1000) || 0;
        
        // Get existing user statistics to calculate proper averages
        const existingStatsResult = await db.query(
            'SELECT * FROM user_statistics WHERE user_id = $1 AND game_id = $2',
            [userId, gameId]
        );
        
        let newAverageScore = totalScore;
        let newAverageTime = timeTaken;
        let newBestTime = timeTaken;
        
        if (existingStatsResult.rows.length > 0) {
            const existing = existingStatsResult.rows[0];
            const totalCompletions = existing.total_completions + 1;
            
            // Calculate new average score
            newAverageScore = parseFloat(((existing.average_score * existing.total_completions + totalScore) / totalCompletions).toFixed(2));
            
            // Calculate new average time
            if (existing.average_time) {
                newAverageTime = parseFloat(((existing.average_time * existing.total_completions + timeTaken) / totalCompletions).toFixed(2));
            }
            
            // Calculate new best time
            if (existing.best_time) {
                newBestTime = Math.min(existing.best_time, timeTaken);
            }
        }
        
        await db.query(
            `UPDATE user_game_sessions 
             SET completed_at = NOW(), 
                 total_score = $1, 
                 accuracy_percentage = $2, 
                 time_taken = $3, 
                 status = 'completed',
                 updated_at = NOW()
             WHERE id = $4`,
            [totalScore, accuracyPercentage, timeTaken, sessionId]
        );

        // Update or create user statistics
        console.log('Updating user statistics with:', {
            userId, gameId, totalScore, newAverageScore, newBestTime, newAverageTime, 
            totalQuestions, correctAnswers, accuracyPercentage
        });
        
        await db.query(
            `INSERT INTO user_statistics (user_id, game_id, total_attempts, total_completions, best_score, average_score, best_time, average_time, total_questions_answered, correct_answers, accuracy_percentage, last_played_at)
             VALUES ($1, $2, 1, 1, $3, $4, $5, $6, $7, $8, $9, NOW())
             ON CONFLICT (user_id, game_id) DO UPDATE SET
                 total_attempts = user_statistics.total_attempts + 1,
                 total_completions = user_statistics.total_completions + 1,
                 best_score = GREATEST(user_statistics.best_score, $3),
                 average_score = $4,
                 best_time = $5,
                 average_time = $6,
                 total_questions_answered = user_statistics.total_questions_answered + $7,
                 correct_answers = user_statistics.correct_answers + $8,
                 accuracy_percentage = $9,
                 last_played_at = NOW(),
                 updated_at = NOW()`,
            [userId, gameId, totalScore, newAverageScore, newBestTime, newAverageTime, totalQuestions, correctAnswers, accuracyPercentage]
        );
        
        console.log('User statistics updated successfully');

        // Check for achievements
        const achievements = [];
        
        // First completion achievement
        const completionCount = await db.query(
            'SELECT total_completions FROM user_statistics WHERE user_id = $1 AND game_id = $2',
            [userId, gameId]
        );
        
        if (completionCount.rows[0]?.total_completions === 1) {
            await db.query(
                'INSERT INTO user_achievements (user_id, game_id, achievement_type, achievement_data) VALUES ($1, $2, $3, $4)',
                [userId, gameId, 'first_completion', JSON.stringify({ score: totalScore, accuracy: accuracyPercentage })]
            );
            achievements.push('First Completion!');
        }

        // Perfect score achievement
        if (totalScore === session.max_possible_score && totalQuestions > 0) {
            await db.query(
                'INSERT INTO user_achievements (user_id, game_id, achievement_type, achievement_data) VALUES ($1, $2, $3, $4)',
                [userId, gameId, 'perfect_score', JSON.stringify({ score: totalScore, time: timeTaken })]
            );
            achievements.push('Perfect Score!');
        }

        res.json({
            sessionId,
            totalScore: totalScore,
            maxPossibleScore: session.max_possible_score,
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            accuracyPercentage: Math.round(accuracyPercentage * 100) / 100,
            timeTaken,
            achievements
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user dashboard data
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    
    console.log('Dashboard requested for user ID:', userId);

    try {
        // Get overall statistics
        const overallStats = await db.query(
            `SELECT 
                COUNT(DISTINCT game_id) as games_played,
                SUM(total_attempts) as total_attempts,
                SUM(total_completions) as total_completions,
                SUM(best_score) as total_points,
                AVG(accuracy_percentage) as average_accuracy
             FROM user_statistics 
             WHERE user_id = $1`,
            [userId]
        );

        // Get game-specific statistics
        const gameStats = await db.query(
            `SELECT 
                g.name,
                g.category,
                us.best_score,
                us.average_score,
                us.total_attempts,
                us.total_completions,
                us.accuracy_percentage,
                us.last_played_at
             FROM user_statistics us
             JOIN games g ON us.game_id = g.id
             WHERE us.user_id = $1
             ORDER BY us.last_played_at DESC`,
            [userId]
        );
        
        console.log('Overall stats:', overallStats.rows[0]);
        console.log('Game stats count:', gameStats.rows.length);
        console.log('Game stats:', gameStats.rows);

        // Get recent achievements
        const achievements = await db.query(
            `SELECT 
                ua.achievement_type,
                ua.achievement_data,
                ua.earned_at,
                g.name as game_name
             FROM user_achievements ua
             JOIN games g ON ua.game_id = g.id
             WHERE ua.user_id = $1
             ORDER BY ua.earned_at DESC
             LIMIT 10`,
            [userId]
        );

        res.json({
            overall: overallStats.rows[0] || {},
            games: gameStats.rows,
            achievements: achievements.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; 