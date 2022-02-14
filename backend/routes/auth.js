const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')

router.post('/', [
    body('name', 'Length should be minimum 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Length should be minimum 5').isLength({ min: 5 })

], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error : 'This email is alredy been used'})});
})

module.exports = router;