import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Welcome to Learnova - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Learnova!</h1>
        </div>
        <div style="padding: 40px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hi ${data.firstName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for joining Learnova! To get started with your AI-powered learning journey, 
            please verify your email address by clicking the button below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" 
               style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't create an account with Learnova, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.verificationUrl}" style="color: #3B82F6;">${data.verificationUrl}</a>
          </p>
        </div>
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 Learnova. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Password Reset Request - Learnova',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #EF4444, #F97316); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
        </div>
        <div style="padding: 40px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hi ${data.firstName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password for your Learnova account. 
            Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" 
               style="background: linear-gradient(135deg, #EF4444, #F97316); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #dc2626; font-size: 14px; font-weight: bold;">
            This link will expire in 10 minutes for security reasons.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.resetUrl}" style="color: #EF4444;">${data.resetUrl}</a>
          </p>
        </div>
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 Learnova. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  courseEnrollment: (data) => ({
    subject: `Welcome to ${data.courseTitle} - Learnova`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Course Enrollment Confirmed!</h1>
        </div>
        <div style="padding: 40px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Hi ${data.firstName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Congratulations! You've successfully enrolled in <strong>${data.courseTitle}</strong>.
            Your AI-powered learning journey starts now!
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
            <h3 style="color: #1f2937; margin-top: 0;">Course Details:</h3>
            <p style="color: #4b5563; margin: 5px 0;"><strong>Title:</strong> ${data.courseTitle}</p>
            <p style="color: #4b5563; margin: 5px 0;"><strong>Instructor:</strong> ${data.instructorName}</p>
            <p style="color: #4b5563; margin: 5px 0;"><strong>Duration:</strong> ${data.duration}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.courseUrl}" 
               style="background: linear-gradient(135deg, #10B981, #059669); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Start Learning Now
            </a>
          </div>
        </div>
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 Learnova. All rights reserved.
          </p>
        </div>
      </div>
    `
  })
};

export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const transporter = createTransporter();
    
    let emailContent;
    if (template && emailTemplates[template]) {
      emailContent = emailTemplates[template](data);
    } else {
      emailContent = { subject, html: data.html || data.text };
    }

    const mailOptions = {
      from: `"Learnova" <${process.env.EMAIL_FROM}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export default { sendEmail };