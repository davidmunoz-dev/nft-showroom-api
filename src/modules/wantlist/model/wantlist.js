'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseTimestamps = require('mongoose-timestamp');

const wantlistModel = new Schema({
    tokenId: { type: String },
    comment: { type: String },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
});

wantlistModel.plugin(mongooseTimestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('WantlistModel', wantlistModel);
