const mongoose = require('mongoose');
const { M_CreateJoinChannel } = require('../../database/schema');

module.exports = {
    data: {
      name: "setChannelModal",
    },
    async execute(interaction, client) {
        const channelInput = interaction.fields.getTextInputValue("channelInput");
        const listInput = interaction.fields.getTextInputValue("listInput");

        let message = ""

        async function handleCreateJoin(channelIdInput, listInput) {
            channelIdInput = channelIdInput.toString();
            const channelRecord = await M_CreateJoinChannel.findOne({channelId: channelIdInput});
            console.log(channelRecord);

            if (channelRecord) {
                message = "This channel already exists in the database. Updating list."
                let newList = [];
                listInput.split('\n').forEach((item) => {
                    newList.push(item);
                });
                channelRecord.listInput = newList;
                channelRecord.save();
            } else {
                message = "This channel does not exist in the database. Creating new channel."
                let newList = [];
                listInput.split('\n').forEach((item) => {
                    newList.push(item);
                });
                const newChannel = new M_CreateJoinChannel({
                    channelId: channelIdInput,
                    listInput: newList,
                });
                newChannel.save();
            }
        }

      await handleCreateJoin(channelInput, listInput);
  
      await interaction.reply({
        content: message,
        ephemeral: true,
      });
  }
};