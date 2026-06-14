import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("arkaans")
    .setDescription(
      "Returns an invitation link to the official Arkaans Discord server."
    ),
  async execute(interaction) {
    await interaction.reply(`https://discord.gg/BgRwHfK`);
  },
};

// module.exports = { data, async execute };
