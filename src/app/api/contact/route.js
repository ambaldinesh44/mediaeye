import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL, // Your Gmail address
        pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 20px; background-color: #f8f9fa;">
            <h3 style="color: #333;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
              </tr>
            </table>
            <h3 style="color: #333; margin-top: 20px;">Message</h3>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This email was sent from the contact form at Media Eye News</p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to user
    const autoReplyMailOptions = {
      from: `"Media Eye News" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting Media Eye News',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
          </div>
          <div style="padding: 20px; background-color: #f8f9fa;">
            <p style="font-size: 16px; color: #333;">Dear ${name},</p>
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Thank you for reaching out to Media Eye News. We have received your message and will get back to you as soon as possible.
            </p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="font-size: 14px; color: #666;">
              Best regards,<br>
              <strong>Media Eye News Team</strong>
            </p>
          </div>
          <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Media Eye News. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyMailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
