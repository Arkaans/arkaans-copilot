module.exports = {
    data: {
      name: "ephemeralStatsButton",
    },
    async execute(interaction, client) {
      
      if(interaction.user.id == "387605378063663105"){
        let serversName = [];
        client.guilds.cache.forEach(server => {
            serversName.push(server.name);
        });
        await interaction.reply({
            content: `Servers using Arkaans Copilot: ${client.guilds.cache.size}\n- ${serversName.join('\n- ')}`
        });
        
    }else{
        await interaction.reply({
            content: `Servers using Arkaans Copilot: ${client.guilds.cache.size}`
        });
    }
    },
  };