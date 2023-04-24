const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-textchannel')
    .setDescription('Create a text channel')
    .addStringOption(option =>
      option.setName('channel-name')
        .setDescription('The name of the element.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('The topic of the element.')
        .setRequired(false)),
  async execute(interaction) {
    const guild = interaction.guild;
    const currentCategory = interaction.channel.parent;
    let elementName = interaction.options.getString('channel-name');
    elementName = elementName.toLowerCase().replace(/[^a-zA-Z\s]+/g, '').replace(/\s+/g, '-');
    const channel = await guild.channels.create({
      name: elementName,
      type: 0,
      topic: interaction.options.getString('topic'),
      parent: currentCategory,
    });
    await interaction.reply(`Created channel ${channel}`);
  }
}
