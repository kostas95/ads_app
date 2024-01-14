const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { v4: uuidv4 } = require('uuid');

router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.query;

        // Check if the email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = (password == user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const newUUID = uuidv4();
        // If email and password are valid, return user data as JSON

        await user.updateOne(
            { $set: { sessionId: newUUID } },
        );

        const userData = {
            email: user.email,
            username: user.name,
            userId: user.id,
            sessionId: newUUID
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }
    // Check passwords match
    if (password != password2) {
        errors.push({ msg: "Passwords don't match" });
    }

    if (errors.length > 0) {
        res.send({
            errors,
        })
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "User exists" });
                res.status(409).send({
                    errors
                })
            } else {
                const newUser = new User(
                    { name, email, password }
                );

                newUser.save().then(user => {
                    res.status(200).send({});
                })
            }
        })
    }
})

module.exports = router;