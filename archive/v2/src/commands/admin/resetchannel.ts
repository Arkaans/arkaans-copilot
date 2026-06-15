const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetchannel")
    .setDescription("Reset a voice channel and it's configuration")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select the channel you want to reset")
        .addChannelTypes(2)
        .setRequired(true)
    ),

  async execute(interaction) {
    const channelName = interaction.options._hoistedOptions[0].channel.name;
    const modal = new ModalBuilder().setTitle(`Reset ${channelName}`).setCustomId("resetChannelModal");

    const channelInput = new TextInputBuilder()
      .setLabel("Channel ID")
      .setCustomId("channelInput")
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setValue(interaction.options._hoistedOptions[0].value);

    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));

    await interaction.showModal(modal);
  },
};
