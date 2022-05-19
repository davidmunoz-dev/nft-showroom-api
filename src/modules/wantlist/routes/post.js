'use strict';
const Joi = require("joi");
const {checkNftExistInWantlistRequest, addNftToWantlistRequest} = require('../api-handler/wantlistRequest');

module.exports = {
    method: 'POST',
    path: '/add/wantlist',
    options: {
        pre: [
            {
                method: checkNftExistInWantlistRequest,
            },

            {
                method: addNftToWantlistRequest,
                assign: 'wantlist'
            },
        ],
        handler: function (request, h) {
            return request.pre.wantlist;
        },
        auth: false,
        description: 'Post',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                user: Joi.object({
                    id: Joi.string().required(),
                }).required(),
                token: Joi.object({
                    id: Joi.string().required(),
                }).required(),
            })
        },
    }
};
