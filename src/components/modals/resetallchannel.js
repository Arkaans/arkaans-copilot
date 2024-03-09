const mongoose = require('mongoose');
const { M_LobbyChannel } = require('../../database/lobbytemp.js');

module.exports = {
    data: {
      name: "resetAllChannelModal",
    },
    async execute(interaction, client) {
      const deleteInput = interaction.fields.getTextInputValue("deleteInputID");

      let message = "";

      async  function handleDelete(){
        if (deleteInput.toLowerCase() === "confirm") {
          message = "All channels have been reset";
          await M_LobbyChannel.deleteMany({guildId: interaction.guildId});
        }else{
          message = "Reset command cancelled";
        }
      }

      await handleDelete();
  
      await interaction.reply({
        content: message,
        ephemeral: true,
      });
  }
};