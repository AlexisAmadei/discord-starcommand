const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-category')
    .setDescription('Create a category')
    .addStringOption(option =>
      option.setName('category-name')
        .setDescription('The name of the category.')
        .setRequired(true)),
  async execute(interaction) {
    const guild = interaction.guild;
    let elementName = interaction.options.getString('category-name').toUpperCase();
    const category = await guild.channels.create({
      name: elementName,
      type: 4,
    });
    await interaction.reply('Created category ' + elementName);
  }
}
