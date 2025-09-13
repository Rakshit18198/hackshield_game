# Email Setup for Forgot Password Feature

To enable the forgot password functionality, you need to configure email settings in your environment variables.

## Required Environment Variables

Add the following variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

## Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security
   - Under "2-Step Verification", click on "App passwords"
   - Generate a new app password for "Mail"
   - Use this password in your `EMAIL_PASSWORD` environment variable

## Alternative Email Services

For production, consider using dedicated email services:

### SendGrid
```env
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### Mailgun
```env
EMAIL_USER=your-mailgun-username
EMAIL_PASSWORD=your-mailgun-api-key
```

## Update Email Configuration

If using a different email service, update the `createTransporter` function in `src/utils/email.js`:

```javascript
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'your-service', // e.g., 'sendgrid', 'mailgun'
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};
```

## Testing

1. Start your backend server
2. Navigate to `/forgot-password` in your frontend
3. Enter a valid email address
4. Check the email for the reset link
5. Click the link to reset your password

## Security Notes

- Reset tokens expire after 1 hour
- Each user can only have one active reset token at a time
- Reset tokens are automatically deleted after use
- The system doesn't reveal whether an email exists or not (security best practice) 