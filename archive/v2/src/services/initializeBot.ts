const { Client, GatewayIntentBits, Events, MessageFlags } = require("discord.js");
const { getGuilds } = require("../services/getGuilds.js");
const { getFunctions, getComponents } = require("../services/getFunctionsAndComponents");
const log = console.log;
const chalk = require("chalk");

function initializeBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMembers,
    ],
  });

  getComponents(client);
  getFunctions(client);

  client.login(process.env.DISCORD_TOKEN).catch((error) => {
    console.error("Failed to login:", error);
  });

  client.on("guildCreate", (guild) => {
    client.handleCommands(guild.id);
    console.log(`Loaded commands for ${guild.name}`);
  });

  client.once(Events.ClientReady, (readyClient) => {
    try {
      const servers = getGuilds(client);
      log(chalk.blue(`Discord API (${readyClient.user.tag}): ${chalk.green.bold("Connected")} `));
      log(chalk.blue(`Servers Live: ${chalk.green.bold(servers)}\n`));
      client.guilds.cache.map((guild) => {
        client.handleCommands(guild.id);
        // console.log(`Loaded commands for ${guild.name}`);
      });
    } catch (error) {
      log(chalk.blue(`Discord API: ${chalk.red.bold("Error")} - ${error.message}`));
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const date = new Date().toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const command = interaction.client.commands.get(interaction.commandName);
    const commandInfo = `${interaction.user.globalName} (${interaction.guild}): /${interaction.commandName} | ${date}`;
    log(commandInfo);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  });
}

module.exports = { initializeBot };
