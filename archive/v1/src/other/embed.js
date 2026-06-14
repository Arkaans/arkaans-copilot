const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Embed command')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const embedMessage = new EmbedBuilder()
            .setTitle('Embed Title')
            .setColor(15158332)
            .setDescription('Embed Description')
        await interaction.reply({ embeds: [embedMessage] });
    }
};