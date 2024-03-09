const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("button")
      .setDescription("Button command")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
          .setCustomId("button")
          .setLabel("Button Title")
          .setStyle(ButtonStyle.Primary);
      await interaction.channel.send({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  