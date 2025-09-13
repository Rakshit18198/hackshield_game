const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hackshield',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function checkDatabase() {
    try {
        console.log('🔍 Checking database connection...');
        
        // Test connection
        const client = await pool.connect();
        console.log('✅ Database connected successfully');
        
        // Check if tables exist
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('📋 Available tables:', tablesResult.rows.map(r => r.table_name));
        
        // Check games table
        const gamesResult = await client.query('SELECT COUNT(*) as count FROM games');
        console.log('🎮 Games count:', gamesResult.rows[0].count);
        
        // Check questions table
        const questionsResult = await client.query('SELECT COUNT(*) as count FROM questions');
        console.log('❓ Questions count:', questionsResult.rows[0].count);
        
        // Check question_options table
        const optionsResult = await client.query('SELECT COUNT(*) as count FROM question_options');
        console.log('📝 Question options count:', optionsResult.rows[0].count);
        
        // If no data, populate sample data
        if (parseInt(gamesResult.rows[0].count) === 0) {
            console.log('📝 No data found. Populating sample data...');
            await populateSampleData(client);
        }
        
        client.release();
        
    } catch (error) {
        console.error('❌ Database error:', error.message);
        console.log('💡 Make sure PostgreSQL is running and database is set up correctly');
    }
}

async function populateSampleData(client) {
    try {
        // Insert sample games
        await client.query(`
            INSERT INTO games (name, description, category, difficulty_level, is_active) VALUES
            ('Phishing Awareness', 'Learn to identify and avoid phishing attacks', 'phishing', 1, true),
            ('Password Security', 'Test your knowledge about strong passwords', 'password_security', 2, true)
            ON CONFLICT DO NOTHING
        `);
        
        // Get game IDs
        const gamesResult = await client.query('SELECT id FROM games');
        const game1Id = gamesResult.rows[0].id;
        const game2Id = gamesResult.rows[1]?.id || game1Id;
        
        // Insert sample questions
        await client.query(`
            INSERT INTO questions (game_id, question_text, question_type, points, order_index, is_active) VALUES
            ($1, 'Which of the following is a sign of a phishing email?', 'mcq', 10, 1, true),
            ($1, 'You should never click on links in suspicious emails.', 'true_false', 5, 2, true),
            ($2, 'What is the minimum recommended length for a strong password?', 'mcq', 10, 1, true)
            ON CONFLICT DO NOTHING
        `, [game1Id]);
        
        // Get question IDs
        const questionsResult = await client.query('SELECT id FROM questions ORDER BY id');
        
        // Insert sample options for first question
        if (questionsResult.rows[0]) {
            await client.query(`
                INSERT INTO question_options (question_id, option_text, is_correct, order_index) VALUES
                ($1, 'Urgent request for personal information', true, 1),
                ($1, 'Professional company logo', false, 2),
                ($1, 'Clear contact information', false, 3),
                ($1, 'Proper grammar and spelling', false, 4)
                ON CONFLICT DO NOTHING
            `, [questionsResult.rows[0].id]);
        }
        
        // Insert sample options for third question
        if (questionsResult.rows[2]) {
            await client.query(`
                INSERT INTO question_options (question_id, option_text, is_correct, order_index) VALUES
                ($1, '6 characters', false, 1),
                ($1, '8 characters', true, 2),
                ($1, '4 characters', false, 3),
                ($1, '12 characters', false, 4)
                ON CONFLICT DO NOTHING
            `, [questionsResult.rows[2].id]);
        }
        
        console.log('✅ Sample data populated successfully');
        
    } catch (error) {
        console.error('❌ Error populating sample data:', error.message);
    }
}

checkDatabase().then(() => {
    console.log('🏁 Database check completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
}); 