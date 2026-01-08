import express from 'express';
import Project from '../models/Project.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/projects
// @desc    Add a new project
// @access  Private
router.post('/', async (req, res) => {
    try {
        const newProject = new Project({
            ...req.body,
            id: req.body.id || uuidv4() // Ensure ID exists if not provided
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        let project = await Project.findOne({ id: req.params.id });

        if (!project) return res.status(404).json({ msg: 'Project not found' });

        project = await Project.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ id: req.params.id });

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
