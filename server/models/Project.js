import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Keeping string ID for compatibility with frontend UUIDs
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String, required: true },
    demoUrl: { type: String },
    repoUrl: { type: String },
    gallery: [{ type: String }],
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
