import { getLobbyChannel, saveLobbyChannel } from "../../database/dynamo";

module.exports = {
  data: {
    name: "setChannelModal",
  },
  async execute(interaction, client) {
    const channelInput = interaction.fields.getTextInputValue("channelInput");
    const listInput = interaction.fields.getTextInputValue("listInput");

    let message = "";
    async function handleCreateOnJoin(channelIdInput, listInput) {
      channelIdInput = channelIdInput.toString();

      const channelRecord = await getLobbyChannel(interaction.guildId, channelIdInput);

      if (channelRecord) {
        message = `<#${channelIdInput}> has been updated:\n${listInput}`;
        let newList = [];
        listInput.split("\n").forEach((item) => {
          newList.push(item);
        });
        channelRecord.listInput = newList;
        await saveLobbyChannel(interaction.guildId, channelIdInput, newList);
      } else {
        message = `<#${channelIdInput}> is ready, it will create temporary channels with the following names:\n${listInput}`;
        let newList = [];
        listInput.split("\n").forEach((item) => {
          newList.push(item);
        });
        await saveLobbyChannel(interaction.guildId, channelIdInput, newList);
      }
    }

    await handleCreateOnJoin(channelInput, listInput);

    await interaction.reply({
      content: message,
      ephemeral: true,
    });
  },
};
