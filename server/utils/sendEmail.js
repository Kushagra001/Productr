const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    // Check if credentials are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP Credentials missing. Email not sent.');
        console.log(`[DEV EMAIL] To: ${to} | Subject: ${subject} | Body: ${text}`);
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // easy preset for gmail
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // App Password, not login password
            },
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
