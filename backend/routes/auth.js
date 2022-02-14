const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')

// Creating a user at /api/auth/signup
router.post('/signup', [
    body('name', 'Length should be minimum 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Length should be minimum 5').isLength({ min: 5 })

], async (req, res) => {
    // Error in validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Checking whether the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'A user with this email alredy exists' })
        }
        
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)

        // Catching any other errors
    }catch(error){
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})

module.exports = router;