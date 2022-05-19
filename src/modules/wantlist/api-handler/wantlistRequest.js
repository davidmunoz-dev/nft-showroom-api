const Boom = require('boom');
const wantlistService = require('../service/wantlist.service');

async function checkNftExistInWantlistRequest(request) {
    let tokenId;
    let userId;

    if (request.payload.token?.id) {
        tokenId = request.payload.token.id;
    }
    if (request.payload.user?.id) {
        userId = request.payload.user.id;
    }
    return await wantlistService.checkNftExistInWantlist(userId, tokenId)
}

async function addNftToWantlistRequest(request) {
    let payload;

    if (request.payload) {
        payload = request.payload;
    }
    return await wantlistService.addNftToWantlist(payload)
}

async function getWantlistByUserIdRequest(request) {
    let userId;

    if (request.params?.user_id) {
        userId = request.params.user_id;
    }
    return await wantlistService.getWantlistByUserId(userId)
}

async function getWantlistByWantlistIdRequest(request) {
    let userId;
    let wantlistId;

    if (request.params?.wantlist_id) {
        wantlistId = request.params.wantlist_id;
    }
    if (request.params?.user_id) {
        userId = request.params.user_id;
    }
    return await wantlistService.getWantlistByWantlistId(wantlistId, userId)
}

module.exports = {
    checkNftExistInWantlistRequest,
    addNftToWantlistRequest,
    getWantlistByUserIdRequest,
    getWantlistByWantlistIdRequest
}
