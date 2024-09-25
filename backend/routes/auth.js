const express = require('express');
const User = require("../models/User")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = "Sumitisagooddev";

//ROUTE 1: Create a User using: POST "api/auth/createuser" 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must have atleast 10 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // Check vaidation when is empty space they show error in array form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the email already exists in the database
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Email already exists get a unique email" })
        }

        const allUsers = await User.find({});
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Check if the hashed password already exists in the database
        for (let existingUser of allUsers) {
            const passwordCompare = await bcrypt.compare(req.body.password, existingUser.password);
            if (passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Password already exists. Please choose a different password." });
            }
        }

        // Add users for unique email and password in the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        // To create a JWT_TOKEN for Register 
        const authtoken = jwt.sign(data, JWT_TOKEN);
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE 2: Authentication a User using: POST "api/auth/login" 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
    async (req, res) => {
        let success = false;

        // Check vaidation when is empty space they show error in array form
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // Check if the email is invalid
            let user = await User.findOne({ email });
            if (!user) {
                success = false
                return res.status(400).json({ success, error: "Please enter a valid email." });
            }

            // Check if the hashed password is invalid
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Please enter a valid password." });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            // To create a JWT_TOKEN for login 
            const authtoken = jwt.sign(data, JWT_TOKEN);
            success = true
            res.json({ success, authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Get logged User Details fetch using POST: "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interal Server Error")
    }
})

module.exports = router;