const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, VoiceConnection } = require('@discordjs/voice')
const {
  Client,
  REST,
  ChannelType,
  GatewayIntentBits,
  Routes,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deezer')
    .setDescription('Lecture playlist Deezer')
    .addStringOption(option =>
      option.setName('lien')
        .setDescription('Playlist Deezer')
        .setRequired(true)),
  async execute(interaction) {
    const link = interaction.options.getString('lien');
    const voiceConnection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    await interaction.reply({ content: `Lecture de la playlist Deezer: ${link}`, ephemeral: false });
  },
};