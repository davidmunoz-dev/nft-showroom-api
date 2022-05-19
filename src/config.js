'use strict';
// Load config according to environment
module.exports=require('./config/' + process.env.NODE_ENV);