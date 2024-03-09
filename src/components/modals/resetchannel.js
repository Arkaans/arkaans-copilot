const mongoose = require('mongoose');
const { M_LobbyChannel } = require('../../database/lobbytemp.js');

module.exports = {
    data: {
      name: "resetChannelModal",
    },
    async execute(interaction, client) {
        const channelInput = interaction.fields.getTextInputValue("channelInput");

        let message = ""

        async function handleDelete(channelIdInput) {
            channelIdInput = channelIdInput.toString();
            const channelRecord = await M_LobbyChannel.findOne({guildId: interaction.guildId, channelId: channelIdInput});

            if (channelRecord) {
                message = `<#${channelIdInput}> has been deleted.`
                channelRecord.deleteOne();
            } else {
                message = `<#${channelIdInput}> does not exists.`
            }
        }

      await handleDelete(channelInput);
  
      await interaction.reply({
        content: message,
        ephemeral: true,
      });
  }
};