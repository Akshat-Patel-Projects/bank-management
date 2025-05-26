import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'gmail' if you're using a Gmail account
  auth: {
    user: process.env.EMAIL_USER, // Your new email
    pass: process.env.EMAIL_PASS, // Your new email's app password
  },
});

const sendVerificationEmail = async (user) => {
  const verificationLink = `http://localhost:5173/verify-email?token=${user.verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verify Your Email",
    html: `
  <p>Click the link below to verify your email:</p>
  <a href="${verificationLink}" style="color: blue; text-decoration: none;">Verify Email</a>
  <p>If you didn't request this, please ignore this email.</p>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export default sendVerificationEmail;
