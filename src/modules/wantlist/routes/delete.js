'use strict';

const Boom = require('boom');
const {getUserFromIdRequest} = require("../../user/api-handler/userRequest");
const {getWantlistByWantlistIdRequest} = require("../api-handler/wantlistRequest");
const Wantlist = require('../model/wantlist');

module.exports = {
    method: 'DELETE',
    path: '/wantlist/{user_id}/{wantlist_id}',
    options: {
        pre: [
            {
                method: getUserFromIdRequest,
                assign: 'user'
            },
            {
                method: getWantlistByWantlistIdRequest,
                assign: 'wantlist'
            }
        ],
        handler: async function (request, h) {
            const wantlist = await Wantlist.deleteOne({_id: request.pre.wantlist._id, user: request.pre.user._id});
            if (wantlist.deletedCount > 0) {
                return {};
            }
            return Boom.badData('Could not remove this item from wantlist');
        },
        auth: false,
        description: 'Delete wantlist by wantlist and user id',
        tags: ['api'],
    }
};
