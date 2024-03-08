module.exports = {
  data: {
    name: "modalID",
  },
  async execute(interaction, client) {
    const textInput = interaction.fields.getTextInputValue("textInputID");
    const paragraphInput = interaction.fields.getTextInputValue("paragraphInputID");

    await interaction.reply("**Text Input:** " + textInput + "\n**Paragraph Input:**\n" + paragraphInput);
    },
};
