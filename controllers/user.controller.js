const User = require('../models/user.model')

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

module.exports.login = (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message: 'email and password required'})
    }

    User.findOne({email})
        .then(user => {
            if(!user) {
                res.status(404).json({message: 'User not found'})
            }else{
               return user.checkPassword(password)
                .then(match => {
                    if(match){
                    res.status(200).json(user)
                }else{
                    res.status(400).json({message: 'User not found'})
                }
                })
            }

        }).catch(next)
}

module.exports.getUser = (req, res, next) => {
    const {id} = req.params

    User.findById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(next)
}

module.exports.updateUser = (req, res, next) => {
    const {id} = req.params

    const userUpdated = req.body

    console.log(req.file)

    User.findByIdAndUpdate(id, userUpdated, {new: true})
    .then(user => {
        if(!user){
            res.status(404).json({message: 'User not found'})
        }else{
            user.profilePicture = req.file ? req.file.url : user.profilePicture
            res.status(200).json(user)
        }
    })
    .catch(next)
}