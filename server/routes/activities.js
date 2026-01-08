import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// @route   GET /api/activities
// @desc    Get all activities
// @access  Public
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().sort({ date: -1 });
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/activities
// @desc    Add new activity
// @access  Public (should be Private)
router.post('/', async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        const activity = await newActivity.save();
        res.json(activity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/activities/:id
// @desc    Delete activity
// @access  Public (should be Private)
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ msg: 'Activity not found' });
        }
        await activity.deleteOne();
        res.json({ msg: 'Activity removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
