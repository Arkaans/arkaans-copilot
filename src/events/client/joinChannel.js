const mongoose = require('mongoose');
const { M_CreateJoinChannel, M_TempChannel } = require('../../database/schema');

module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState) {
        oldStateChannel = oldState.channel;
        newStateChannel = newState.channel;

        async function isTempChannel(channelIdInput) {
            const channelRecord = await M_TempChannel.findOne({ channelId: channelIdInput });
            if (channelRecord) {
                return true;
            }
            return false;
        }

        async function handleTempChannel(channelIdInput) {
            const channelRecord = await M_TempChannel.findOne({ channelId: channelIdInput });
            if (channelRecord) {
                const channel = newState.guild.channels.cache.get(channelRecord.channelId);
                if (channel.members.size === 0) {
                    channel.delete();
                    await M_TempChannel.findOneAndDelete({ channelId: channelIdInput });
                }
            }
        }

        async function handleChannelJoin(channelIdInput) {
            channelIdInput = channelIdInput.toString();
            const channelRecord = await M_CreateJoinChannel.findOne({ channelId: channelIdInput });

            if (channelRecord) {
                const randomInput = channelRecord.listInput[Math.floor(Math.random() * channelRecord.listInput.length)];
                newState.guild.channels.create({
                    name: randomInput,
                    type: 2,
                    parent: newState.channel.parentId,
                  }).then((channel) => {
                    newState.setChannel(channel);
                    new M_TempChannel({
                        channelId: channel.id,
                    }).save();
                  });

            }
        }

        if (newStateChannel) {
            const respond = await isTempChannel(newStateChannel.id);
            if(!respond)
                await handleChannelJoin(newStateChannel.id);
        }

        if (oldStateChannel) {
            const respond = await isTempChannel(oldStateChannel.id);
            if(respond)
                await handleTempChannel(oldStateChannel.id);
        }
        
    },
  };
  