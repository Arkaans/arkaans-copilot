const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const S_LobbyChannel = new Schema({
    guildId: String,
    channelId: String,
    listInput: Array,
});

const M_LobbyChannel = mongoose.model('LobbyChannel', S_LobbyChannel);

const S_TempChannel = new Schema({
    guildId: String,
    channelId: String,
});

const M_TempChannel = mongoose.model('TempChannel', S_TempChannel);

module.exports = {
    M_LobbyChannel,
    M_TempChannel,
}; 