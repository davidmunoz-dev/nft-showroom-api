'use strict';
const nftService = require('../service/nft.service');

module.exports = {
    method: 'GET',
    path: '/nfts/{owner_id}',
    options: {
        pre: [
            {
                method: nftService.getNftsByOwner,
                assign: 'nfts'
            }
        ],
        handler: async function (request, h) {
            return request.pre.nfts;
        },
        auth: false,
        description: 'Get',
        tags: ['api'],
    }
};
