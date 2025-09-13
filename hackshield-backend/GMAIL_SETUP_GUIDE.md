# Gmail Setup Guide for Forgot Password Feature

## Current Error
You're getting: `535-5.7.8 Username and Password not accepted`

This means Gmail is rejecting your credentials. Here's how to fix it:

## Step-by-Step Gmail Setup

### 1. Enable 2-Factor Authentication (Required)
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the steps to enable 2-Factor Authentication

### 2. Generate an App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Click "Generate"
6. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### 3. Update Your Environment Variables
Add these to your `.env` file:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
FRONTEND_URL=http://localhost:5173
```

**Important Notes:**
- Use your full Gmail address (e.g., `john.doe@gmail.com`)
- Use the 16-character app password, NOT your regular Gmail password
- Remove spaces from the app password if any

### 4. Test the Configuration
Restart your backend server and try the forgot password feature again.

## Alternative: Use a Different Email Service

If Gmail continues to give issues, consider these alternatives:

### Option 1: Use Ethereal Email (for testing)
Update your `.env` file:
```env
EMAIL_USER=ethereal
EMAIL_PASSWORD=ethereal
```

And update `src/utils/email.js`:
```javascript
const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'your-ethereal-email',
            pass: 'your-ethereal-password'
        }
    });
};
```

### Option 2: Use SendGrid
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Update your `.env`:
```env
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### Option 3: Use Mailgun
1. Sign up at [Mailgun](https://mailgun.com/)
2. Get your API key
3. Update your `.env`:
```env
EMAIL_USER=your-mailgun-username
EMAIL_PASSWORD=your-mailgun-api-key
```

## Common Issues and Solutions

### Issue: "Username and Password not accepted"
**Solution:** Make sure you're using an App Password, not your regular password

### Issue: "2-Step Verification not enabled"
**Solution:** Enable 2-Step Verification first, then generate an App Password

### Issue: "Less secure app access"
**Solution:** Google deprecated this feature. You must use App Passwords with 2FA enabled.

### Issue: "App passwords not available"
**Solution:** Make sure 2-Step Verification is enabled first

## Testing Your Setup

1. Add the environment variables to your `.env` file
2. Restart your backend server
3. Go to `/forgot-password` in your frontend
4. Enter a valid email address
5. Check if the email is sent successfully

## Security Best Practices

- Never commit your `.env` file to version control
- Use App Passwords instead of your main password
- Regularly rotate your App Passwords
- Consider using dedicated email services for production

## Need Help?

If you're still having issues:
1. Double-check that 2-Factor Authentication is enabled
2. Verify you're using the correct App Password
3. Make sure there are no extra spaces in your environment variables
4. Try a different email service as shown above 