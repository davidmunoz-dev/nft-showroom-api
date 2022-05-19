const userService = require('../service/user.service');

async function checkUserExistByNameRequest(request) {
    let name;

    if (request.payload.name) {
        name = request.payload.name;
    }
    return await userService.checkUserExistByName(name)
}

async function getUserFromIdRequest(request) {
    let name;

    if (request.payload?.user_id) {
        name = request.payload.user_id;
    } else if (request.params?.user_id) {
        name = request.params.user_id;
    }
    return await userService.getUserFromId(name)
}

async function getUserFromNameRequest(request) {
    let name;

    if (request.params?.user_name) {
        name = request.params.user_name;
    }
    return await userService.getUserFromName(name)
}

module.exports = {
    checkUserExistByNameRequest,
    getUserFromIdRequest,
    getUserFromNameRequest
}
