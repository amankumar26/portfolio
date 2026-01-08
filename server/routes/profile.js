import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Get user profile (creates one if not exists)
// @access  Public
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();

        // If no profile exists, return a default/empty structure or null
        // (In a real app, you might seed this)
        if (!profile) {
            return res.json({ message: 'No profile found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private (TODO: Add Auth Middleware)
router.put('/', async (req, res) => {
    const {
        name,
        title,
        bio,
        avatarUrl,
        resumeUrl,
        stats,
        socialLinks,
        competitive
    } = req.body;

    // Build profile object
    const profileFields = {
        name,
        title,
        bio,
        avatarUrl,
        resumeUrl,
        stats,
        socialLinks,
        competitive
    };

    try {
        let profile = await Profile.findOne();

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                {},
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
