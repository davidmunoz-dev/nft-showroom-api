'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/get')
        ]);
    },
    pkg: require('./package.json')
};
