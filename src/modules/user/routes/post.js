'use strict';

const Boom = require('boom');
const User = require("../model/user");
const {checkUserExistByNameRequest} = require('../api-handler/userRequest');

module.exports = {
    method: 'POST',
    path: '/user',
    options: {
        pre: [
            {
                method: checkUserExistByNameRequest,
            },
        ],
        handler: async function (request, h) {
            try {
                let user = new User({name: request.payload.name});
                return await user.save();
            } catch (err) {
                throw  Boom.badData(err);
            }
        },
        auth: false,
        description: 'Post',
        tags: ['api'],
    }
};
