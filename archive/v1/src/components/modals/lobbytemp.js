const mongoose = require('mongoose');
const { M_LobbyChannel } = require('../../database/lobbytemp.js');

module.exports = {
    data: {
      name: "setChannelModal",
    },
    async execute(interaction, client) {
        const channelInput = interaction.fields.getTextInputValue("channelInput");
        const listInput = interaction.fields.getTextInputValue("listInput");

        let message = ""

        async function handleCreateOnJoin(channelIdInput, listInput) {
            channelIdInput = channelIdInput.toString();
            const channelRecord = await M_LobbyChannel.findOne({guildId: interaction.guildId, channelId: channelIdInput});

            if (channelRecord) {
                message = `<#${channelIdInput}> has been updated:\n${listInput}`
                let newList = [];
                listInput.split('\n').forEach((item) => {
                    newList.push(item);
                });
                channelRecord.listInput = newList;
                channelRecord.save();
            } else {
                message = `<#${channelIdInput}> is ready, it will create temporary channels with the following names:\n${listInput}`
                let newList = [];
                listInput.split('\n').forEach((item) => {
                    newList.push(item);
                });
                const newChannel = new M_LobbyChannel({
                    guildId: interaction.guildId,
                    channelId: channelIdInput,
                    listInput: newList,
                });
                newChannel.save();
            }
        }

      await handleCreateOnJoin(channelInput, listInput);
  
      await interaction.reply({
        content: message,
        ephemeral: true,
      });
  }
};