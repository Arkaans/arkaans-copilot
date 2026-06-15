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
      .setName("resetchannel")
      .setDescription("Reset a voice channel and it's configuration")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption(option =>
          option.setName("channel")
              .setDescription("Select the channel you want to reset")
              .addChannelTypes(2)
              .setRequired(true)),

  async execute(interaction) {
    const modal = new ModalBuilder().setTitle("Channel setup").setCustomId("resetChannelModal");

    const channelInput = new TextInputBuilder()
    .setLabel("Reset channel ID")
    .setCustomId("channelInput")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setValue(interaction.options._hoistedOptions[0].value);
    
    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));

    await interaction.showModal(modal);
  }
};