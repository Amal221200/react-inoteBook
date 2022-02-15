require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// ROUTE 1: Creating a user at /api/auth/signup
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

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, SECRET_KEY)

        res.json({authToken})
        // res.json(user)

        // Catching any other errors
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 2: Authenticating a user at /api/auth/login
router.post('/login',
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
    async (req, res) => {
        // Error in validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({error:'Please enter the correct credentials'})
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if(!comparePassword){
                return res.status(400).json({error:'Please enter the correct credentials'})
            }

            const data = {
                user:{
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, SECRET_KEY);

            res.status(200).json({authToken})
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })





module.exports = router;