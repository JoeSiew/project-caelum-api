const {User} = require('../models/users_model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

async function auth(req,res,next)
{
    user = await User.findOne({username:req.body.username})
    if(!user) return res.status(400).send('Invalid user or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.')

    next()
}

module.exports = auth