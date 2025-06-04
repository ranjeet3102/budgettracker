// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Set up transporter using Gmail
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});


const mailOptions = {
  from: process.env.GMAIL_USER,          // "forchatgpt3102@gmail.com"
  to: "forchatgpt3102@gmail.com",        // You’re sending it to yourself
  replyTo: email,                        // So replies go to the user
  subject: `New message from ${name}`,
  text: message,
  html: `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p>${message}</p>
  `,
};


  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Email sending failed" }), { status: 500 });
  }
}
