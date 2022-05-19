'use strict';
let config = {};

config.app = {
    host: '0.0.0.0',
    port: 7070,
};

config.database = {
    url: "mongodb://127.0.0.1:27017/nft-showroom"
};

config.routes = {
    prefix: "api",
    cors: {
        origin: ['*'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'Origin'],
        additionalHeaders: ['x-context', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'x-developer-structure', 'x-app-ref', 'x-app-version']
    }
};

config.blipp = {};

config.good = {
    includes: {
        request: ['payload', 'headers'],
        response: ['payload'],
    },
    ops: {
        interval: 15000,
    },
    reporters: {
        console: [{
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: '@hapi/good-console'
        }, 'stdout'],
    }
};

module.exports = config;
