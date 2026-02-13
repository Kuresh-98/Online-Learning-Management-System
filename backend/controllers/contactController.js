const nodemailer = require('nodemailer');

// POST /api/contact
exports.sendContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide name, email and message.' });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT || 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost || !smtpUser || !smtpPass) {
            return res.status(500).json({ message: 'SMTP is not configured on the server.' });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort == 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        const toAddress = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

        const mailOptions = {
            from: `${name} <${email}>`,
            to: toAddress,
            subject: subject || `New contact form message from ${name}`,
            text: `You received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || ''}\n\nMessage:\n${message}\n`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (err) {
        console.error('Contact send error:', err);
        // Return detailed error in non-production to help debugging locally
        if (process.env.NODE_ENV !== 'production') {
            return res.status(500).json({ message: 'Failed to send message.', error: err.message });
        }
        return res.status(500).json({ message: 'Failed to send message.' });
    }
};
