import { deleteLobbyChannel, getLobbyChannel } from "../../database/dynamo";

module.exports = {
  data: {
    name: "resetChannelModal",
  },
  async execute(interaction, client) {
    const channelInput = interaction.fields.getTextInputValue("channelInput");

    let message = "";

    async function handleDelete(channelIdInput) {
      channelIdInput = channelIdInput.toString();
      const channelRecord = await getLobbyChannel(interaction.guildId, channelIdInput);

      if (channelRecord) {
        deleteLobbyChannel(interaction.guildId, channelIdInput);
        message = `<#${channelIdInput}> has been deleted.`;
      } else {
        message = `<#${channelIdInput}> does not exists.`;
      }
    }

    await handleDelete(channelInput);

    await interaction.reply({
      content: message,
      ephemeral: true,
    });
  },
};
