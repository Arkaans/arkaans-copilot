const { Collection } = require("discord.js");
const fs = require("node:fs");

function getFunctions(client) {
  const functionFolder = fs.readdirSync(`./src/functions`);

  for (const folder of functionFolder) {
    const functionFiles = fs
      .readdirSync(`./src/functions/${folder}`)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
    for (const file of functionFiles) require(`../functions/${folder}/${file}`)(client);
  }

  client.handleEvents();
  client.handleComponents();
}

function getComponents(client) {
  client.commands = new Collection();
  client.buttons = new Collection();
  client.selectMenus = new Collection();
  client.modals = new Collection();
  client.commandArray = [];
}

module.exports = {
  getFunctions,
  getComponents,
};
