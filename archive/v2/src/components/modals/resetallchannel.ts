import { deleteAllLobbyChannels } from "../../database/dynamo";

module.exports = {
  data: {
    name: "resetAllChannelModal",
  },
  async execute(interaction, client) {
    const deleteInput = interaction.fields.getTextInputValue("deleteInputID");

    let message = "";

    async function handleDelete() {
      if (deleteInput.toLowerCase() === "reset") {
        message = "All channels have been reset";
        await deleteAllLobbyChannels(interaction.guildId);
      } else {
        message = "Reset command cancelled";
      }
    }

    await handleDelete();

    await interaction.reply({
      content: message,
      ephemeral: true,
    });
  },
};
