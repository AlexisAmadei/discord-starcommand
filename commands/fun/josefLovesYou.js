const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('josef-loves-you')
    .setDescription('Josef loves you!'),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`Don't worry Josef loves you ${user} !`);
    }
}
