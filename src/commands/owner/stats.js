const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Display stats about Arkaans Copilot')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        
        const button = new ButtonBuilder()
          .setCustomId("ephemeralStatsButton")
          .setLabel("Post stats")
          .setStyle(ButtonStyle.Primary);

        if(interaction.user.id == "387605378063663105"){
            let serversName = [];
            client.guilds.cache.forEach(server => {
                serversName.push(server.name);
            });
            await interaction.reply({
                content: `Servers using Arkaans Copilot: ${client.guilds.cache.size}\n- ${serversName.join('\n- ')}`,
                components: [new ActionRowBuilder().addComponents(button)],
                ephemeral: true
            });
            
        }else{
            await interaction.reply({
                content: `Servers using Arkaans Copilot: ${client.guilds.cache.size}`,
                components: [new ActionRowBuilder().addComponents(button)],
                ephemeral: true
            });
        }
    }
};