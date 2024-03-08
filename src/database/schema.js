const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const S_CreateJoinChannel = new Schema({
    channelId: String,
    listInput: Array,
});

const M_CreateJoinChannel = mongoose.model('CreateJoinChannel', S_CreateJoinChannel);

const S_TempChannel = new Schema({
    channelId: String,
});

const M_TempChannel = mongoose.model('TempChannel', S_TempChannel);

module.exports = {
    M_CreateJoinChannel,
    M_TempChannel,
}; 