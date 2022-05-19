'use strict';

const {getUserFromIdRequest} = require("../../user/api-handler/userRequest");
const {getWantlistByUserIdRequest} = require("../api-handler/wantlistRequest");

module.exports = {
    method: 'GET',
    path: '/wantlist/{user_id}',
    options: {
        pre: [
            {
                method: getUserFromIdRequest,
                assign: 'user'
            },
            {
                method: getWantlistByUserIdRequest,
                assign: 'wantlist'
            }
        ],
        handler: async function (request, h) {
            return request.pre.wantlist;
        },
        auth: false,
        description: 'Get',
        tags: ['api'],
    }
};
