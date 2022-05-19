'use strict';
const config = require('./config');
const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');

let server;
module.exports = server = new Hapi.Server({
    host: config.app.host,
    port: config.app.port,
    debug: process.env.NODE_ENV === 'development' && {request: ['error']},
    routes: {
        validate: {
            failAction: (request, h, err) => {
                throw err;
            }
        },
        cors: config.routes.cors
    }
});

server.listener.keepAliveTimeout = 90 * 1000;
server.listener.headersTimeout = 95 * 1000;

let plugins = [
    require('./modules/nft/index.js'),
    require('./modules/wantlist/index.js'),
    require('./modules/user/index.js'),
];

const init = async () => {
    await server.register({
        plugin: require('blipp'),
        options: config.blipp
    });

    await server.register({
        plugin: require('@hapi/good'),
        options: config.good
    });

    await server.register(require('@hapi/vision'));

    await server.register(require('@hapi/inert'));

    await server.register({
        plugin: require('hapi-pagination'),
        options: {
            routes: {
                include: [],
            }
        }
    });


    // Register alive plugin
    await server.register({
        plugin: require('hapi-alive'),
        options: {
            path: '/', //Health route path
            tags: ['health', 'monitor'],
            healthCheck: async function (server) {
                //Here you should preform your health checksgit log --all --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
                //If something went wrong , throw an error.
                /*if (somethingFailed) {
                    throw new Error('Server not healthy');
                }*/
                return true;
            }
        }
    });

    await Promise.all(plugins.map(plugin => {
        return new Promise(async resolve => {
            await server.register(plugin);
            resolve();
        });
    }));


    await server.start();

    Mongoose.connect(config.database.url, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Server NFT Showroom API running at: ${server.info.uri}`);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.stop({timeout: 10000}).then(function (err) {
        console.log('hapi server stopped')

        Mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.');
            process.exit(0);
        });
    });
});

init();
