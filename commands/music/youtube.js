const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
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
    player.on('error', error => {
      console.error(`XXX => Error: ${error.message}${error.resource.metadata ? ` with resource ${error.resource.metadata.title}` : ''}`);
      player.stop();
      connection.disconnect();
    });
    connection.on('disconnect', () => {
      console.log('#> Connection disconnected');
    });
    player.on('stateChange', (oldState, newState) => {
      console.log(`#> Audio player transitioned from ${oldState.status} to ${newState.status}`);
    });

    try {
      const info = await ytdl.getBasicInfo(url);
      const thumbnail = info.videoDetails.thumbnails[0].url;
      const replyEmbed = new EmbedBuilder()
        .setTitle('Playing this shit...')
        .setDescription(`Playing ${url}`)
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setThumbnail(thumbnail);
      interaction.reply({ embeds: [replyEmbed] })
    } catch(err) {
      console.log(err);
    }
  }
};
