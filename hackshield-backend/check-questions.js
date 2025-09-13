const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hackshield',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function checkQuestions() {
    try {
        console.log('🔍 Checking questions and their types...');
        
        const client = await pool.connect();
        
        // Check all questions with their types
        const questionsResult = await client.query(`
            SELECT q.id, q.question_text, q.question_type, q.game_id, 
                   COUNT(qo.id) as option_count
            FROM questions q
            LEFT JOIN question_options qo ON q.id = qo.question_id
            GROUP BY q.id, q.question_text, q.question_type, q.game_id
            ORDER BY q.game_id, q.order_index
        `);
        
        console.log('📝 Questions with types:');
        questionsResult.rows.forEach(q => {
            console.log(`- ID: ${q.id}, Type: ${q.question_type}, Options: ${q.option_count}`);
            console.log(`  Text: ${q.question_text.substring(0, 100)}...`);
        });
        
        // Check question options for specific questions
        const optionsResult = await client.query(`
            SELECT qo.question_id, qo.option_text, qo.is_correct, qo.order_index
            FROM question_options qo
            ORDER BY qo.question_id, qo.order_index
        `);
        
        console.log('\n📋 Question options:');
        optionsResult.rows.forEach(opt => {
            console.log(`- Q${opt.question_id}: "${opt.option_text}" (Correct: ${opt.is_correct})`);
        });
        
        client.release();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkQuestions().then(() => {
    console.log('🏁 Check completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
}); 