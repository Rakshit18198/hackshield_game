const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hackshield',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function checkCorrectAnswers() {
    try {
        console.log('🔍 Checking correct answers for different question types...');
        
        const client = await pool.connect();
        
        // Check correct answers for all questions
        const correctAnswersResult = await client.query(`
            SELECT ca.question_id, ca.answer_text, ca.is_case_sensitive, ca.partial_match_allowed,
                   q.question_text, q.question_type
            FROM correct_answers ca
            JOIN questions q ON ca.question_id = q.id
            ORDER BY ca.question_id
        `);
        
        console.log('✅ Correct answers:');
        if (correctAnswersResult.rows.length === 0) {
            console.log('No correct answers found in the database!');
        } else {
            correctAnswersResult.rows.forEach(ca => {
                console.log(`- Q${ca.question_id} (${ca.question_type}): "${ca.answer_text}"`);
                console.log(`  Case sensitive: ${ca.is_case_sensitive}, Partial match: ${ca.partial_match_allowed}`);
            });
        }
        
        // Check which questions don't have correct answers
        const questionsWithoutAnswers = await client.query(`
            SELECT q.id, q.question_text, q.question_type
            FROM questions q
            LEFT JOIN correct_answers ca ON q.id = ca.question_id
            WHERE ca.id IS NULL
            ORDER BY q.id
        `);
        
        console.log('\n❌ Questions without correct answers:');
        if (questionsWithoutAnswers.rows.length === 0) {
            console.log('All questions have correct answers!');
        } else {
            questionsWithoutAnswers.rows.forEach(q => {
                console.log(`- Q${q.id} (${q.question_type}): ${q.question_text.substring(0, 80)}...`);
            });
        }
        
        client.release();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkCorrectAnswers().then(() => {
    console.log('🏁 Check completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
}); 