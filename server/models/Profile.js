import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
    github: String,
    linkedin: String,
    twitter: String,
    email: String
}, { _id: false });

const leetCodeSchema = new mongoose.Schema({
    username: String,
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    profileUrl: String
}, { _id: false });

const platformSchema = new mongoose.Schema({
    name: String,
    username: String,
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    rating: Number, // Keeping for backward compatibility or optional use
    maxRating: Number,
    rank: String,
    profileUrl: String,
    icon: String
}, { _id: false });

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: String,
    avatarUrl: String,
    resumeUrl: String,
    views: { type: Number, default: 0 },
    stats: [{
        label: String,
        value: String
    }],
    socialLinks: socialSchema,
    competitive: {
        leetcode: leetCodeSchema,
        platforms: [platformSchema],
        activity: [new mongoose.Schema({
            problemName: String,
            problemId: String,
            platform: String,
            date: Date,
            url: String,
            difficulty: {
                type: String,
                enum: ['Easy', 'Medium', 'Hard'],
                default: 'Medium'
            }
        }, { _id: false })]
    }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
