import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with Hello!"),
  async execute(interaction) {
    await interaction.reply(`Hello ${interaction.user}!`);
  },
};
