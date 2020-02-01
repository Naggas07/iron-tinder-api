const User = require('../models/user.model')
const mongoose = require('mongoose')

module.exports.base = (req, res, next) => {
    res.json({});
};

module.exports.create =   (req, res, next) => {
    const {name, userName, email, password} = req.body

    const user = {
        name,
        userName,
        email,
        password
    }

    User.create(user)
        .then(user => {
            res.status(202).json({message: 'user created'})
        })
        .catch(next)
}