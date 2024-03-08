const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("song")
        .setDescription("Song command")
        .addStringOption(option =>
            option.setName("youtubelink")
                .setDescription("Lien youtube")
                .setRequired(true)),
    async execute(interaction) {
        const youtubelink = interaction.options.getString("youtubelink");

        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply("You need to be in a voice channel to play music!");

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            } catch (error) {
                connection.destroy();
            }
        });

        const stream = ytdl(youtubelink, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        await interaction.reply(`Playing: ${youtubelink}`);
    }
};
