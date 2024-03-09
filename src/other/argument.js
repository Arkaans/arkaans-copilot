const {
    SlashCommandBuilder,
    PermissionFlagsBits,
  } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("argument")
        .setDescription("Argument command")
        .addStringOption(option =>
            option.setName("firstargument")
                .setDescription("First argument description")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("secondargument")
                .setDescription("Second argument description")
                .setRequired(true)),
    async execute(interaction) {
        const firstargument = interaction.options.getString("firstargument");
        const secondargument = interaction.options.getString("secondargument");
        await interaction.reply(`Argument 1: ${firstargument}\nArgument 2: ${secondargument}`);
    }
};