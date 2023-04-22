const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-voicechannel')
    .setDescription('Create a voice channel')
    .addStringOption(option =>
      option.setName('channel-name')
        .setDescription('The name of the channel.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('userlimit')
        .setDescription('The user limit of the channel.')
        .setRequired(false)),
  async execute(interaction) {
    const guild = interaction.guild;
    let elementName = interaction.options.getString('channel-name');
    const userLimit = interaction.options.getString('userlimit');
    const channel = await guild.channels.create({
      name: elementName,
      type: 2,
      userLimit: userLimit,
      bitrate: 64000,
    });
    await interaction.reply('Created channel ' + elementName);
  }
}
