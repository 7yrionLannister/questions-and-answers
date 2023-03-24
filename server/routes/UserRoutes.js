const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

const userDB = require('../models/UserModel');

router.route('/')
    .post(async (req, res) => {
        try {
            const { username, role, password } = req.body;
            if(!(username && role && password)) {
                res.status(400).send('Username, role and password are required');
            } else {
                const oldUser = await userDB.findOne({username}).exec();
                if(oldUser) {
                    res.status(409).send('User already exists');
                } else {
                    let encryptedPwd = await bcrypt.hash(password, 10);
                    const user = await userDB.create({
                        username,
                        role,
                        password: encryptedPwd
                    });
                    const token = jwt.sign(
                        {user_id: user._id, username},
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: '5h'
                        }
                    );
                    user.token = token;
                    res.status(201).json(user);
                }
            }
        } catch(err) {
            res.status(500).send('Server error while registering user');
        }
    })
    .get(async (req, res) => {
        await userDB.find()
            .select('-password')
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    message: 'Error getting users'
                });
            });
    });

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!(username && password)) {
            res.status(400).send('Required input was not set');
        } else {
            const user = await userDB.findOne({username}).exec();
            if(user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {user_id: user._id, username},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '5h'
                    }
                );
                user.token = token;
                res.status(200).json(user);
            } else {
                res.status(400).send('Invalid credentials');
            }
        }
    } catch(err) {
        res.status(400).send('Server error when authenticating');
    }
})

module.exports = router;