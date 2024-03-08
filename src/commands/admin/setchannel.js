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
      .setDescription("Set Channel")
      .addChannelOption(option =>
          option.setName("channel")
              .setDescription("The channel to set")
              .addChannelTypes(2)
              .setRequired(true)),

  async execute(interaction) {
    
    const modal = new ModalBuilder().setTitle("Set new channel").setCustomId("setChannelModal");
    
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
    .setStyle(TextInputStyle.Paragraph);

    
    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));
    modal.addComponents(new ActionRowBuilder().addComponents(listInput));

    await interaction.showModal(modal);
  }
};