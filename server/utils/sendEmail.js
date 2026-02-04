const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    // Check if credentials are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP Credentials missing. Email not sent.');
        console.log(`[DEV EMAIL] To: ${to} | Subject: ${subject} | Body: ${text}`);
        return;
    }

    try {
        console.log(`[EMAIL] Attempting to send to ${to}...`);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 20000,
        });

        await transporter.sendMail({
            from: `"Productr App" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });

        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error('❌ Email send failed:', error);
        // Fallback logging for dev
        console.log(`[DEV EMAIL FALLBACK] To: ${to} | Code: ${text}`);
    }
};

module.exports = sendEmail;
