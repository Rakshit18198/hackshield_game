const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hackshield',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function debugStats() {
    try {
        console.log('🔍 Debugging user statistics...');
        
        const client = await pool.connect();
        
        // Check all users
        const usersResult = await client.query('SELECT id, name, email FROM users');
        console.log('👥 Users:', usersResult.rows);
        
        // Check all user_statistics
        const statsResult = await client.query('SELECT * FROM user_statistics');
        console.log('📊 All user statistics:', statsResult.rows);
        
        // Check user_game_sessions
        const sessionsResult = await client.query('SELECT * FROM user_game_sessions');
        console.log('🎮 All game sessions:', sessionsResult.rows);
        
        // Check user_answers
        const answersResult = await client.query('SELECT * FROM user_answers');
        console.log('✅ All user answers:', answersResult.rows);
        
        // Check user_achievements
        const achievementsResult = await client.query('SELECT * FROM user_achievements');
        console.log('🏆 All achievements:', achievementsResult.rows);
        
        client.release();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

debugStats().then(() => {
    console.log('🏁 Debug completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
}); 