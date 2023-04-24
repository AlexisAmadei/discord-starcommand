const client = require('../../index.js');
const { YOUTUBE_API_KEY } = require('../../config.json');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')
const ytdl = require('ytdl-core');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Play ytb videos')
    .addStringOption(option =>
      option.setName("url")
        .setDescription("The url of the ytb video")
        .setRequired(true)
    ),
  async execute(interaction) {
    const url = interaction.options.getString("url");
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) return interaction.reply('Pas en vocal :(');

    const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const ressource = createAudioResource(stream);
    const player = createAudioPlayer();
    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false,
    });
    connection.subscribe(player);
    player.play(ressource);
    await interaction.reply('Playing this shit');
  }
};