import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isPdf = file.mimetype === 'application/pdf';
        return {
            folder: 'portfolio',
            resource_type: isPdf ? 'raw' : 'auto',
            format: isPdf ? 'pdf' : undefined,
            allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            public_id: file.originalname.split('.')[0] + "_" + Date.now()
        };
    },
});

const upload = multer({ storage: storage });

// @route   POST /api/upload
// @desc    Upload file to Cloudinary
// @access  Private
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        res.json({ url: req.file.path });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;
