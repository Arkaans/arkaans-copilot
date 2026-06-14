import { getLobbyChannel } from "../../database/dynamo";
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setchannel")
    .setDescription("Select a voice channel and configure temporary names to display")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Select the channel to configure").addChannelTypes(2).setRequired(true)
    ),

  async execute(interaction) {
    const channelName = interaction.options._hoistedOptions[0].channel.name;
    const modal = new ModalBuilder().setTitle(`Setup ${channelName}`).setCustomId("setChannelModal");

    const guildId = interaction.guildId;
    const channelId = interaction.options._hoistedOptions[0].value.toString();

    const channelRecord = await getLobbyChannel(guildId, channelId);

    let databaseInputToString = "";

    if (channelRecord) {
      channelRecord.listInput.forEach((element) => {
        databaseInputToString += element + "\n";
      });
    }

    const channelInput = new TextInputBuilder()
      .setLabel("Selected channel ID")
      .setCustomId("channelInput")
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setValue(interaction.options._hoistedOptions[0].value);

    const listInput = new TextInputBuilder()
      .setLabel("List of names (one per line)")
      .setCustomId("listInput")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph)
      .setValue(databaseInputToString);

    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));
    modal.addComponents(new ActionRowBuilder().addComponents(listInput));

    await interaction.showModal(modal);
  },
};
