const nodemailer = require('nodemailer');

// Create transporter (you'll need to configure this with your email service)
const createTransporter = () => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file.');
    }

    // For development, you can use Gmail or other services
    // For production, consider using services like SendGrid, Mailgun, etc.
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
        },
        // Additional options for better compatibility
        secure: true,
        tls: {
            rejectUnauthorized: false
        }
    });
};

const sendPasswordResetEmail = async (email, resetToken, resetUrl) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'HackShield - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">HackShield</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
                        <p style="color: #666; line-height: 1.6;">
                            You requested a password reset for your HackShield account. Click the button below to reset your password:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      padding: 12px 30px; 
                                      text-decoration: none; 
                                      border-radius: 5px; 
                                      display: inline-block;
                                      font-weight: bold;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If you didn't request this password reset, please ignore this email. This link will expire in 1 hour.
                        </p>
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If the button doesn't work, copy and paste this link into your browser:<br>
                            <a href="${resetUrl}" style="color: #667eea;">${resetUrl}</a>
                        </p>
                    </div>
                    <div style="background: #333; padding: 20px; text-align: center;">
                        <p style="color: #999; margin: 0; font-size: 12px;">
                            © 2024 HackShield. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};

module.exports = {
    sendPasswordResetEmail,
}; 