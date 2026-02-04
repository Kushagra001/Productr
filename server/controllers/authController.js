const User = require('../models/User');

// Generate 4-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = require('../utils/sendEmail');

exports.login = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        console.log(`[AUTH] Login attempt for: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`[AUTH] User not found: ${email}`);
            return res.status(404).json({ error: 'User not found. Please Sign Up.' });
        }

        console.log(`[AUTH] User found. Generating OTP...`);
        const otp = generateOTP();
        user.otp = {
            code: otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
        };
        await user.save();
        console.log(`[AUTH] OTP saved to DB. Sending email...`);

        // Send Email (Non-blocking / Fail-safe)
        try {
            await sendEmail(email, 'Your Productr OTP', `Your OTP for login is: ${otp}`);
            console.log(`[AUTH] Email process completed.`);
        } catch (emailError) {
            console.error(`[AUTH] Email failed (Dev Mode Active):`, emailError.message);
        }

        // Return OTP in response for Dev Mode
        res.json({ message: 'OTP generated', otp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.signup = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists. Please Login.' });
        }

        user = new User({ email });
        const otp = generateOTP();
        user.otp = {
            code: otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
        };
        await user.save();

        // Send Email (Non-blocking / Fail-safe)
        try {
            await sendEmail(email, 'Welcome to Productr!', `Welcome! Your verification OTP is: ${otp}`);
        } catch (emailError) {
            console.error(`[AUTH] Email failed (Dev Mode Active):`, emailError.message);
        }

        // Return OTP for Dev Mode
        res.json({ message: 'OTP generated', otp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.otp || user.otp.code !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (new Date() > user.otp.expiresAt) {
            return res.status(400).json({ error: 'OTP expired' });
        }

        // Clear OTP
        user.otp = undefined;
        await user.save();

        res.json({
            message: 'Login successful',
            userId: user._id,
            email: user.email,
            user: {
                _id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
