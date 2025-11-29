import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // ------------------------------
  // 1. Store in MySQL
  // ------------------------------
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT || 3306,
    });

    const query = 'INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())';
    await connection.execute(query, [name, email, phone, message]);

    await connection.end();
  } catch (err) {
    console.error('MySQL Error:', err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  // ------------------------------
  // 2. Send Email
  // ------------------------------
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ZapCorp Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL, // e.g., support@zapcorp.com
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

  } catch (err) {
    console.error('Email Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }

  // ------------------------------
  // 3. Return success
  // ------------------------------
  res.status(200).json({ success: true, message: 'Message received successfully' });
}
