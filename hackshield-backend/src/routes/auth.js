const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/database');
const { sendPasswordResetEmail } = require('../utils/email');

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Delete any existing reset tokens for this user
        await db.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [user.id]);

        // Save new reset token
        await db.query(
            'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [user.id, resetToken, expiresAt]
        );

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

        // Send email
        const emailSent = await sendPasswordResetEmail(email, resetToken, resetUrl);

        if (emailSent) {
            res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        } else {
            res.status(500).json({ error: 'Failed to send password reset email' });
        }
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        // Find valid reset token
        const result = await db.query(
            'SELECT prt.*, u.email FROM password_reset_tokens prt JOIN users u ON prt.user_id = u.id WHERE prt.token = $1 AND prt.expires_at > NOW()',
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        const resetToken = result.rows[0];

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user password
        await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, resetToken.user_id]);

        // Delete used reset token
        await db.query('DELETE FROM password_reset_tokens WHERE id = $1', [resetToken.id]);

        res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify reset token route
router.get('/verify-reset-token/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()',
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        res.json({ valid: true });
    } catch (err) {
        console.error('Verify reset token error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 