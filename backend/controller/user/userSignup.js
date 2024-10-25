const express = require('express');
const app = express();

// Increase payload limit
app.use(express.json({ limit: '5mb' }));  // Adjust size as needed
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignupController(req, res) {
    try {
        const { email, password, name } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists!");
        }

        if (!email) throw new Error("Please provide an email");
        if (!password) throw new Error("Please provide a password");
        if (!name) throw new Error("Please provide a name");

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword,
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!",
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignupController;
