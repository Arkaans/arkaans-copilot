const mongoose = require('mongoose');
const { M_LobbyChannel } = require('../../database/lobbytemp.js');

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
      .setName("setchannel")
      .setDescription("Select a voice channel and configure temporary names to display")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption(option =>
          option.setName("channel")
              .setDescription("Select the channel to configure")
              .addChannelTypes(2)
              .setRequired(true)),

  async execute(interaction) {
    
    const modal = new ModalBuilder().setTitle("Channel setup").setCustomId("setChannelModal");
    
    const channelRecord = await M_LobbyChannel.findOne({guildId: interaction.guildId, channelId: interaction.options._hoistedOptions[0].value.toString()});
    let databaseInputToString = ""
    
    if (channelRecord) {
      channelRecord.listInput.forEach((element) => {
        databaseInputToString += element + "\n";
      });
    }

    const channelInput = new TextInputBuilder()
    .setLabel("Selected channel ID")
    .setCustomId("channelInput")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setValue(interaction.options._hoistedOptions[0].value);

    const listInput = new TextInputBuilder()
    .setLabel("List of names (one per line)")
    .setCustomId("listInput")
    .setRequired(true)
    .setStyle(TextInputStyle.Paragraph)
    .setValue(databaseInputToString);

    
    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));
    modal.addComponents(new ActionRowBuilder().addComponents(listInput));

    await interaction.showModal(modal);
  }
};