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
      .setName("resetallchannel")
      .setDescription("Reset all channels and their configurations")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const modal = new ModalBuilder().setTitle("Reset all channel").setCustomId("resetAllChannelModal");

    const deleteInput = new TextInputBuilder()
      .setCustomId("deleteInputID")
      .setPlaceholder("")
      .setLabel("Type CONFIRM to reset channels.")
      .setStyle(TextInputStyle.Short);
    
    modal.addComponents(new ActionRowBuilder().addComponents(deleteInput));

    await interaction.showModal(modal);
  }
};