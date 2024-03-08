const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('arkaans')
        .setDescription('Invitation link to the Arkaans official server'),
    async execute(interaction, client) {
        await interaction.reply('https://discord.gg/UfTYMFT2Fu');
    }
};