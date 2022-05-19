'use strict';
const {getUserFromIdRequest} = require('../api-handler/userRequest');

module.exports = {
    method: 'GET',
    path: '/user/{user_id}',
    options: {
        pre: [
            {
                method: getUserFromIdRequest,
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
