const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
// Trigger restart for env vars
const cors = require('cors');

const authController = require('./controllers/authController');
const productController = require('./controllers/productController');

const app = express();
app.use(cors({
    origin: '*', // Allow all for debugging, specific domains in prod recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Debug Middleware
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

// Routes
const router = express.Router();

// Auth
router.post('/auth/login', authController.login);
router.post('/auth/signup', authController.signup);
router.post('/auth/verify', authController.verifyOTP);

// Products
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

app.use('/api', router);

// MongoDB Connection
// MongoDB Connection
// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/productr', {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB Successfully');
        require('fs').appendFileSync('db-debug.log', `[${new Date().toISOString()}] Connected successfully\n`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        require('fs').appendFileSync('db-debug.log', `[${new Date().toISOString()}] Connection Error: ${err.message}\nStack: ${err.stack}\n`);
    }
};

mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
