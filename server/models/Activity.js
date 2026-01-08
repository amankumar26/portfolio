import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    problemName: { type: String, required: true },
    problemId: String,
    platform: { type: String, required: true },
    date: { type: Date, required: true },
    url: String,
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
