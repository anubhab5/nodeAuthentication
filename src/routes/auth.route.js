const mongoose = require('mongoose');
const router = require('express').Router();
const { User } = require("../model/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password");

    const validPasword = await bcrypt.compare(req.body.password, user.password);
    if (!validPasword) return res.status(400).send("Invalid email or password");

    const token = user.generateToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(250).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;