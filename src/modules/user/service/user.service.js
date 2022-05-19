const Boom = require('boom');
const User = require('../model/user');

async function checkUserExistByName(name) {
    if (!name) {
        return Boom.badData('Name is null');
    }
    try {
        const user = await User.findOne({name})
        if (user) {
            return Boom.badData('User already exist for this name')
        }
    } catch (error) {
        return Boom.badData(error)
    }
    return null;
}

async function getUserFromId(user_id) {
    if (!user_id) {
        return Boom.badData('UserID is null');
    }
    try {
        const user = await User.findOne({_id: user_id})
        if (user) {
            return user;
        }
        return Boom.badData('User not found')
    } catch (error) {
        return Boom.badData(error)
    }
}

async function getUserFromName(user_name) {
    if (!user_name) {
        return Boom.badData('Username is null');
    }
    try {
        const user = await User.findOne({name: user_name})
        if (user) {
            return user;
        }
        return Boom.badData('User not found')
    } catch (error) {
        return Boom.badData(error)
    }
}

module.exports = {
    checkUserExistByName,
    getUserFromId,
    getUserFromName
}
