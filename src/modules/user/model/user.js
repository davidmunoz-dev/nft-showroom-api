'use strict';

const mongoose = require('mongoose');
const mongooseTimestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

const userModel = new Schema({
    name: { type: String, required: true },
});

userModel.plugin(mongooseTimestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('UserModel', userModel);
