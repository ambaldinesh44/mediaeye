# Contact Form Setup Guide

## Overview
The contact form has been successfully created with email functionality using Gmail SMTP. This guide will help you configure it.

## Files Created

1. **Page Route**: `src/app/contact-us/page.js`
2. **Component**: `components/ContactUsPage.js`
3. **Styles**: `style/contact.css`
4. **API Route**: `src/app/api/contact/route.js`
5. **Environment Template**: `.env.example`

## Features

### Form Features
- ✅ Name field validation (minimum 2 characters)
- ✅ Email field validation (valid email format)
- ✅ Subject field validation (minimum 3 characters)
- ✅ Message field validation (minimum 10 characters)
- ✅ Real-time error messages
- ✅ Loading state during submission
- ✅ Success/Error feedback messages
- ✅ Responsive design

### Email Features
- ✅ Sends notification to admin with contact details
- ✅ Sends auto-reply confirmation to user
- ✅ Professional HTML email templates
- ✅ Gmail SMTP integration

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install nodemailer
```
✅ Already installed!

### Step 2: Configure Gmail App Password

1. **Enable 2-Step Verification**
   - Go to [Google Account](https://myaccount.google.com)
   - Navigate to Security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to Security > 2-Step Verification
   - Scroll down to "App passwords"
   - Click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Name it "MediaEye Contact Form"
   - Click "Generate"
   - Copy the 16-character password (remove spaces)

### Step 3: Create .env.local File

Create a `.env.local` file in the root directory with:

```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  # Your 16-character app password
ADMIN_EMAIL=admin@mediaeyenews.com  # Optional: where to receive messages
```

**Important**:
- Use your actual Gmail address for `SMTP_EMAIL`
- Use the App Password (NOT your regular Gmail password)
- Never commit `.env.local` to Git (already in .gitignore)

### Step 4: Test the Form

1. Start the development server:
```bash
npm run dev
```

2. Visit: `http://localhost:3000/contact-us`

3. Fill out and submit the form

4. Check for:
   - Success message on the page
   - Email received at admin email
   - Auto-reply received at sender's email

## Email Templates

### Admin Notification Email
- Subject: "Contact Form: [User's Subject]"
- Contains: Name, Email, Subject, Message
- Reply-To: User's email address

### User Auto-Reply Email
- Subject: "Thank you for contacting Media Eye News"
- Contains: Confirmation message with their submitted details
- Professional branded template

## Troubleshooting

### Error: "Invalid login"
- Check that 2-Step Verification is enabled
- Verify you're using App Password, not regular password
- Ensure no spaces in the App Password

### Error: "Connection timeout"
- Check your internet connection
- Verify Gmail SMTP settings
- Try port 465 with secure: true

### Emails not received
- Check spam/junk folder
- Verify email addresses in .env.local
- Check console for errors

## Security Notes

- ✅ Environment variables are used for sensitive data
- ✅ .env.local is gitignored
- ✅ Email validation on both client and server
- ✅ Rate limiting recommended for production
- ✅ CORS headers configured

## URL Access

After deployment, the contact form will be available at:
- Local: `http://localhost:3000/contact-us`
- Production: `https://yourdomain.com/contact-us`

## Customization

### Updating Contact Information
Edit the contact information in `components/ContactUsPage.js`:
```javascript
<div className="contact-info-item">
  <i className="bi bi-geo-alt-fill"></i>
  <div>
    <h5>Address</h5>
    <p>Your Address Here</p>
  </div>
</div>
```

### Styling
Modify styles in `style/contact.css` to match your brand colors and design.

### Email Templates
Edit HTML templates in `src/app/api/contact/route.js` to customize email appearance.

## Production Considerations

1. **Add Rate Limiting**: Prevent spam submissions
2. **Add CAPTCHA**: Consider adding Google reCAPTCHA
3. **Email Service**: Consider using SendGrid or AWS SES for higher volume
4. **Error Logging**: Implement proper error logging service
5. **Analytics**: Track form submissions

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure nodemailer is installed
4. Check Gmail security settings

---

✅ **Contact form is now ready to use!**
