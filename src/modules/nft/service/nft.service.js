const https = require('https');
const Boom = require('boom');
const endpoint = 'eth-mainnet.alchemyapi.io';

function getNftsByOwner(request) {
    return new Promise(async (resolve, reject) => {
        const query = https.request({
            host: endpoint,
            path: '/v2/demo/getNFTs/?owner=' + request.params.owner_id,
            method: 'GET',
            rejectUnauthorized: false,
        }, (res) => {
            let response = '';
            res.setEncoding('utf8');
            res.on('data', async function (chunk) {
                response += chunk;
            });
            res.on('end', async (chunk) => {
                try {
                    const data = JSON.parse(response);
                    return resolve(data);
                } catch (err) {
                    return reject(Boom.badRequest('[GET] eth-mainnet.alchemyapi.io/v2/demo/getNFTs - Error', err));
                }
            });
        });

        query.on('error', (error) => {
            return reject(Boom.badRequest('[GET] eth-mainnet.alchemyapi.io/v2/demo/getNFTs - Error', error));
        });
        query.end();
    });
}

module.exports = {
    getNftsByOwner
}
