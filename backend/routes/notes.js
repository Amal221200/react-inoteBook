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

// ROUTE 3: Updating a note at PUT api/notes/updatenote/:id. Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const newNote = {}

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send('Not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server occured' })
    }
})

// ROUTE 4: Deleting a note at DELETE api/notes/deletenote/:id. Login required
router.delete('/deletenote/:id', fetchUser, async (req, res)=>{
    try {
        
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send('Not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server occured' })
    }
})

module.exports = router;