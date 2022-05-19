const Boom = require('boom');
const Wantlist = require('../model/wantlist');

async function checkNftExistInWantlist(userId, tokenId) {
    if (!tokenId) {
        return Boom.badData('Token is null');
    }
    try {
        const wantlist = await Wantlist.findOne({tokenId: tokenId, user: userId})
        if (wantlist) {
            return Boom.badData('NFT already exists in wantlist')
        }
    } catch (error) {
        return Boom.badData(error)
    }
    return null;
}

async function addNftToWantlist(payload) {
    if (!payload) {
        return Boom.badData('Payload is null');
    }
    try {
        let wantlist = new Wantlist({tokenId: payload.token.id, user: payload.user.id});
        return await wantlist.save();
    } catch (error) {
        return Boom.badData(error)
    }
}

async function getWantlistByUserId(userId) {
    if (!userId) {
        return Boom.badData('UserID is null');
    }
    try {
        let wantlist = await Wantlist.find({user: userId});
        if (wantlist) {
            return wantlist;
        }
        return Boom.notFound('Wantlist not found for this user ID');
    } catch (error) {
        return Boom.badData(error)
    }
}

async function getWantlistByWantlistId(wantlistId, userId) {
    if (!wantlistId) {
        return Boom.badData('WantlistId is null');
    }
    if (!userId) {
        return Boom.badData('UserID is null');
    }
    try {
        let wantlist = await Wantlist.findOne({_id: wantlistId, user: userId});
        if (wantlist) {
            return wantlist;
        }
        return Boom.notFound('Wantlist not found for this wantlist ID');
    } catch (error) {
        return Boom.badData(error)
    }
}

module.exports = {
    checkNftExistInWantlist,
    addNftToWantlist,
    getWantlistByUserId,
    getWantlistByWantlistId
}
