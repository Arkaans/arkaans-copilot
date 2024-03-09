const mongoose = require("mongoose");
const { M_LobbyChannel } = require("../../database/lobbytemp.js");

module.exports = {
  data: {
    name: "resetchannelbutton",
  },
  async execute(interaction, client) {
    const channelRecord = await M_LobbyChannel.findOne({
      guildId: interaction.guildId,
      channelId: interaction.options._hoistedOptions[0].value.toString(),
    });
    let databaseInputToString = "";

    if (channelRecord) {
      channelRecord.listInput.forEach((element) => {
        databaseInputToString += element + "\n";
      });
    }

    await interaction.reply({
      content: "Ephemeral message",
      ephemeral: true,
    });
  },
};
