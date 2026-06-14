const {
    SlashCommandBuilder,
    ModalBuilder,
    PermissionFlagsBits,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
  } = require("discord.js");

  
module.exports = {
    data: new SlashCommandBuilder()
      .setName("modal")
      .setDescription("Modal command")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
      const modal = new ModalBuilder().setTitle("Modal").setCustomId("modalID");

      const textInput = new TextInputBuilder()
        .setLabel("Text Input")
        .setCustomId("textInputID")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const paragraphInput = new TextInputBuilder()
        .setLabel("Paragraph Input")
        .setCustomId("paragraphInputID")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);
  
      modal.addComponents(new ActionRowBuilder().addComponents(textInput));
      modal.addComponents(new ActionRowBuilder().addComponents(paragraphInput));
  
      await interaction.showModal(modal);
    },
  };