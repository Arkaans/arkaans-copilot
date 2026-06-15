const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Learn about Arkaans Copilot with the complete commands documentation"),
  async execute(interaction, client) {
    await interaction.reply({
      content:
        "## ADMIN COMMANDS\n```/setchannel```└ Defines a voice channel as the target to create temporary channels when the user accesses it. The names for the temporary channels you have defined are displayed randomly.\n```/resetchannel```└ Clears the existing list for a selected channel.\n```/resetallchannel```└ Clears all existing lists on the server; caution, this command resets everything.\n```/stats```└ Display stats about Arkaans Copilot.\n\n## USER COMMANDS\n```/song```└ Plays a song from a YouTube link.\n```/arkaans```└ Returns an invitation link to the official Arkaans Discord server.",
      ephemeral: true,
    });
  },
};
