const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hackshield',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function addCorrectAnswers() {
    try {
        console.log('🔍 Adding correct answers for drag_drop and scenario questions...');
        
        const client = await pool.connect();
        
        // Add correct answers for drag_drop question (Q5)
        await client.query(`
            INSERT INTO correct_answers (question_id, answer_text, is_case_sensitive, partial_match_allowed) VALUES
            (5, 'suspicious links: high risk', false, true),
            (5, 'urgent language: high risk', false, true),
            (5, 'company logo: low risk', false, true),
            (5, 'professional branding: low risk', false, true),
            (5, 'high risk: suspicious links', false, true),
            (5, 'high risk: urgent language', false, true),
            (5, 'low risk: company logo', false, true),
            (5, 'low risk: professional branding', false, true)
            ON CONFLICT DO NOTHING
        `);
        
        // Add correct answers for scenario question (Q6)
        await client.query(`
            INSERT INTO correct_answers (question_id, answer_text, is_case_sensitive, partial_match_allowed) VALUES
            (6, 'verify the request through a different channel', false, true),
            (6, 'call the colleague directly', false, true),
            (6, 'contact them through official channels', false, true),
            (6, 'verify the email address', false, true),
            (6, 'check if the request is legitimate', false, true),
            (6, 'do not wire money immediately', false, true),
            (6, 'investigate the request first', false, true),
            (6, 'confirm the urgency through other means', false, true)
            ON CONFLICT DO NOTHING
        `);
        
        console.log('✅ Correct answers added successfully!');
        
        // Verify the additions
        const verifyResult = await client.query(`
            SELECT ca.question_id, ca.answer_text, q.question_type
            FROM correct_answers ca
            JOIN questions q ON ca.question_id = q.id
            WHERE ca.question_id IN (5, 6)
            ORDER BY ca.question_id
        `);
        
        console.log('\n📋 Added correct answers:');
        verifyResult.rows.forEach(ca => {
            console.log(`- Q${ca.question_id} (${ca.question_type}): "${ca.answer_text}"`);
        });
        
        client.release();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

addCorrectAnswers().then(() => {
    console.log('🏁 Process completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
}); 