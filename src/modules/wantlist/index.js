'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/get'),
            require('./routes/post'),
            require('./routes/delete'),
        ]);
    },
    pkg: require('./package.json')
};
