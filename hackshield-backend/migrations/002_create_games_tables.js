/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // Games table - stores different mini-games
    pgm.createTable('games', {
        id: 'id',
        name: { type: 'text', notNull: true },
        description: { type: 'text' },
        category: { type: 'text', notNull: true }, // e.g., 'phishing', 'password_security', 'social_engineering'
        difficulty_level: { type: 'integer', notNull: true, default: 1 }, // 1-5 scale
        is_active: { type: 'boolean', notNull: true, default: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // Questions table - stores all questions for all games
    pgm.createTable('questions', {
        id: 'id',
        game_id: { type: 'integer', notNull: true, references: '"games"' },
        question_text: { type: 'text', notNull: true },
        question_type: { type: 'text', notNull: true }, // 'mcq', 'true_false', 'fill_blank', 'drag_drop', 'scenario'
        difficulty_level: { type: 'integer', notNull: true, default: 1 },
        points: { type: 'integer', notNull: true, default: 10 },
        time_limit: { type: 'integer' }, // in seconds, null for no limit
        order_index: { type: 'integer', notNull: true, default: 1 },
        is_active: { type: 'boolean', notNull: true, default: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // Question options table - for MCQ and other question types that need options
    pgm.createTable('question_options', {
        id: 'id',
        question_id: { type: 'integer', notNull: true, references: '"questions"' },
        option_text: { type: 'text', notNull: true },
        is_correct: { type: 'boolean', notNull: true, default: false },
        order_index: { type: 'integer', notNull: true, default: 1 },
        explanation: { type: 'text' }, // explanation for why this option is correct/incorrect
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // Correct answers table - for non-MCQ questions
    pgm.createTable('correct_answers', {
        id: 'id',
        question_id: { type: 'integer', notNull: true, references: '"questions"' },
        answer_text: { type: 'text', notNull: true },
        is_case_sensitive: { type: 'boolean', notNull: true, default: false },
        partial_match_allowed: { type: 'boolean', notNull: true, default: false },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // User game sessions table - tracks when users start/complete games
    pgm.createTable('user_game_sessions', {
        id: 'id',
        user_id: { type: 'integer', notNull: true, references: '"users"' },
        game_id: { type: 'integer', notNull: true, references: '"games"' },
        started_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        completed_at: { type: 'timestamp' },
        total_score: { type: 'integer', default: 0 },
        max_possible_score: { type: 'integer', default: 0 },
        accuracy_percentage: { type: 'decimal(5,2)' },
        time_taken: { type: 'integer' }, // in seconds
        status: { type: 'text', notNull: true, default: 'in_progress' }, // 'in_progress', 'completed', 'abandoned'
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // User answers table - stores individual question responses
    pgm.createTable('user_answers', {
        id: 'id',
        session_id: { type: 'integer', notNull: true, references: '"user_game_sessions"' },
        question_id: { type: 'integer', notNull: true, references: '"questions"' },
        user_answer: { type: 'text' }, // for text-based answers
        selected_option_id: { type: 'integer', references: '"question_options"' }, // for MCQ
        is_correct: { type: 'boolean', notNull: true },
        points_earned: { type: 'integer', notNull: true, default: 0 },
        time_taken: { type: 'integer' }, // in seconds
        answered_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // User achievements table - tracks user progress and achievements
    pgm.createTable('user_achievements', {
        id: 'id',
        user_id: { type: 'integer', notNull: true, references: '"users"' },
        game_id: { type: 'integer', notNull: true, references: '"games"' },
        achievement_type: { type: 'text', notNull: true }, // 'first_completion', 'perfect_score', 'speed_run', 'streak'
        achievement_data: { type: 'json' }, // flexible data storage for different achievement types
        earned_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // User statistics table - aggregated user performance data
    pgm.createTable('user_statistics', {
        id: 'id',
        user_id: { type: 'integer', notNull: true, references: '"users"' },
        game_id: { type: 'integer', notNull: true, references: '"games"' },
        total_attempts: { type: 'integer', notNull: true, default: 0 },
        total_completions: { type: 'integer', notNull: true, default: 0 },
        best_score: { type: 'integer', notNull: true, default: 0 },
        average_score: { type: 'decimal(5,2)', default: 0 },
        best_time: { type: 'integer' }, // in seconds
        average_time: { type: 'decimal(5,2)' },
        total_questions_answered: { type: 'integer', notNull: true, default: 0 },
        correct_answers: { type: 'integer', notNull: true, default: 0 },
        accuracy_percentage: { type: 'decimal(5,2)', default: 0 },
        last_played_at: { type: 'timestamp' },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    // Add unique constraint for user_statistics
    pgm.addConstraint('user_statistics', 'user_statistics_user_game_unique', {
        unique: ['user_id', 'game_id']
    });

    // Create indexes for better performance
    pgm.createIndex('questions', 'game_id');
    pgm.createIndex('questions', 'question_type');
    pgm.createIndex('question_options', 'question_id');
    pgm.createIndex('correct_answers', 'question_id');
    pgm.createIndex('user_game_sessions', 'user_id');
    pgm.createIndex('user_game_sessions', 'game_id');
    pgm.createIndex('user_game_sessions', 'status');
    pgm.createIndex('user_answers', 'session_id');
    pgm.createIndex('user_answers', 'question_id');
    pgm.createIndex('user_achievements', 'user_id');
    pgm.createIndex('user_achievements', 'game_id');
    pgm.createIndex('user_statistics', 'user_id');
    pgm.createIndex('user_statistics', 'game_id');

    // Insert some sample games
    pgm.sql(`
        INSERT INTO games (name, description, category, difficulty_level) VALUES
        ('Phishing Awareness', 'Learn to identify phishing emails and avoid falling for scams', 'phishing', 1),
        ('Password Panic', 'Test your password security knowledge and create strong passwords', 'password_security', 2),
        ('Social Engineering Defense', 'Learn to recognize and resist social engineering tactics', 'social_engineering', 3),
        ('Network Security Basics', 'Understand basic network security concepts and practices', 'network_security', 2),
        ('Data Protection Challenge', 'Learn about data privacy and protection best practices', 'data_protection', 2)
    `);
};

exports.down = pgm => {
    pgm.dropTable('user_statistics');
    pgm.dropTable('user_achievements');
    pgm.dropTable('user_answers');
    pgm.dropTable('user_game_sessions');
    pgm.dropTable('correct_answers');
    pgm.dropTable('question_options');
    pgm.dropTable('questions');
    pgm.dropTable('games');
};