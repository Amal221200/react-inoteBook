const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')


// ROUTE 1: Fetching all notes at GET api/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        const notes = await Notes.find({ user: userID })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server occured' })
    }
})

// ROUTE 2: Add a new note at POST api/notes/addnote. Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 3 })
], async (req, res) => {
    // Error in validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { title, description, tag } = req.body

        const note = await Notes.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })

        res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server occured' })
    }
})



module.exports = router;