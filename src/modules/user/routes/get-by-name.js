'use strict';
const {getUserFromNameRequest} = require('../api-handler/userRequest');

module.exports = {
    method: 'GET',
    path: '/user/name/{user_name}',
    options: {
        pre: [
            {
                method: getUserFromNameRequest,
                assign: 'user'
            }
        ],
        handler: async function (request, h) {
            return request.pre.user;
        },
        auth: false,
        description: 'Get user by name',
        tags: ['api', 'user'],
    }
};
