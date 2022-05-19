'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/get'),
            require('./routes/get-by-name'),
            require('./routes/post'),
        ]);
    },
    pkg: require('./package.json')
};
