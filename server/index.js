import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import uploadRoutes from './routes/upload.js';
import activityRoutes from './routes/activities.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/activities', activityRoutes);

app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

// Health Check
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
