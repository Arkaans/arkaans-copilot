import { deleteTempChannel, getLobbyChannel, getTempChannel, saveTempChannel } from "../../database/dynamo";

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    const oldStateChannel = oldState.channel;
    const newStateChannel = newState.channel;

    async function isTempChannel(channelIdInput) {
      const channelRecord = await getTempChannel(newState.guild.id, channelIdInput);
      if (channelRecord) {
        return true;
      }
      return false;
    }

    async function handleTempChannel(channelIdInput) {
      const channelRecord = await getTempChannel(newState.guild.id, channelIdInput);
      if (channelRecord) {
        const channel = newState.guild.channels.cache.get(channelRecord.channelId);
        if (channel.members.size === 0) {
          channel.delete();
          await deleteTempChannel(newState.guild.id, channelIdInput);
        }
      }
    }

    async function handleChannelJoin(channelIdInput) {
      channelIdInput = channelIdInput.toString();
      const guildId = newState.guild.id;
      const channelId = channelIdInput;
      const channelRecord = await getLobbyChannel(guildId, channelId);

      if (channelRecord) {
        const randomInput = channelRecord.listInput[Math.floor(Math.random() * channelRecord.listInput.length)];
        newState.guild.channels
          .create({
            name: randomInput,
            type: 2,
            parent: newState.channel.parentId,
          })
          .then((channel) => {
            newState.setChannel(channel);
            saveTempChannel(newState.guild.id, channel.id);
          });
      }
    }

    if (newStateChannel) {
      const respond = await isTempChannel(newStateChannel.id);
      if (!respond) await handleChannelJoin(newStateChannel.id);
    }

    if (oldStateChannel) {
      const respond = await isTempChannel(oldStateChannel.id);
      if (respond) await handleTempChannel(oldStateChannel.id);
    }
  },
};
